import { join } from 'path'
const getPath = (...relative: string[]) => join(__dirname, '..', ...relative)

export const configPath = getPath('../config.json')
export const dataDir = (...relative: string[]) => getPath(`../asset/data`, ...relative)
export const manifestPath = (resVer: number, db: string = '') => dataDir(`manifest_${resVer}${db}`)
export const masterPath = (resVer: number, db: string = '') => dataDir(`master_${resVer}${db}`)
export const downloadDir = (...relative: string[]) => getPath(`../asset/download`, ...relative)
export const iconDir = (...relative: string[]) => getPath(`../asset/icon`, ...relative)
export const cardDir = (...relative: string[]) => getPath(`../asset/card`, ...relative)
export const scoreDir = (...relative: string[]) => getPath(`../asset/score`, ...relative)
export const voiceDir = (...relative: string[]) => getPath(`../asset/voice`, ...relative)
export const bgmDir = (...relative: string[]) => getPath(`../asset/bgm`, ...relative)
export const liveDir = (...relative: string[]) => getPath(`../asset/live`, ...relative)

export default getPath