import modalMixin from './modal-mixin'
import ProgressBar from '../../vue/component/ProgressBar.vue'

import Component, { mixins } from 'vue-class-component'
import updater from './updater'
import { error } from './log'

const { shell } = window.node.electron

@Component({
  components: {
    ProgressBar
  }
})
export default class extends mixins(modalMixin) {
  versionData: any = {}
  updateProgress: number = 0
  btnDisabled: boolean = false

  cancel (): void {
    updater.abort()
    this.close()
  }

  async showRepo (): Promise<void> {
    this.playSe(this.enterSe)
    if (this.versionData.appZipUrl && process.env.NODE_ENV === 'production') {
      this.btnDisabled = true
      try {
        updater.onDownload((status) => {
          this.updateProgress = status.loading
        })
        const result = await updater.download()
        updater.onDownload(null)
        if (result) {
          updater.relaunch()
        } else {
          this.btnDisabled = false
          this.updateProgress = 0
        }
      } catch (err: any) {
        updater.onDownload(null)
        this.btnDisabled = false
        this.event.$emit('alert', this.$t('home.errorTitle'), err.message)
      }
    } else if (this.versionData.exeUrl) {
      shell.openExternal(this.versionData.exeUrl).catch(err => {
        console.error(err)
        error(`VERSION exeUrl: ${err.stack}`)
      })
    } else if (this.versionData.zipUrl) {
      shell.openExternal(this.versionData.zipUrl).catch(err => {
        console.error(err)
        error(`VERSION zipUrl: ${err.stack}`)
      })
    } else {
      shell.openExternal('https://github.com/toyobayashi/mishiro/releases').catch(err => {
        console.error(err)
        error(`VERSION releases: ${err.stack}`)
      })
    }
  }

  mounted (): void {
    this.$nextTick(() => {
      this.event.$on('versionCheck', (versionData: any) => {
        // tslint:disable-next-line: no-floating-promises
        import(/* webpackChunkName: "marked" */ 'marked').then(marked => {
          this.show = true
          this.visible = true
          versionData.description = (marked as any).default(versionData.release.body)
          this.versionData = versionData
        }).catch(err => {
          console.error(err)
          error(`MENU versionCheck: ${err.stack}`)
        })
      })
    })
  }
}
