import mfc1 from './mfc-1-fabiana.jpg'
import mfc2 from './mfc-2-tiago.jpg'
import mfc3 from './mfc-3-manuela.jpg'

export const MFC_IMAGES = {
  'mfc-1': mfc1,  // Fabiana Dubinevics
  'mfc-2': mfc2,  // Tiago Ariel
  'mfc-3': mfc3,  // Manuela Guedes
} as const

export type MFCImageKey = keyof typeof MFC_IMAGES

export { mfc1, mfc2, mfc3 }
