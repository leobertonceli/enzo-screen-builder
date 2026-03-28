import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// All exportable screens
import { AgendamentoFlowScreen }  from './screens/AgendamentoFlowScreen'
import { AgendarConsultaScreen }  from './screens/AgendarConsultaScreen'
import { AliceAgoraScreen }       from './screens/AliceAgoraScreen'
import { EspecialistasScreen }    from './screens/EspecialistasScreen'
import { EspecialistasScreenV2 }  from './screens/EspecialistasScreenV2'
import { RedeCredenciadaScreen }  from './screens/RedeCredenciadaScreen'
import { RedeAliceScreen }        from './screens/RedeAliceScreen'
import { HomeScreen }             from './screens/HomeScreen'
import { HomeScreenV2 }           from './screens/HomeScreenV2'
import { HomeScreenV3 }           from './screens/HomeScreenV3'
import { HomeScreenV4 }           from './screens/HomeScreenV4'
import { FiltersScreen }          from './screens/FiltersScreen'
import { SettingsScreen }         from './screens/SettingsScreen'

const SCREENS: Record<string, React.ComponentType> = {
  AgendamentoFlowScreen,
  AgendarConsultaScreen,
  AliceAgoraScreen,
  EspecialistasScreen,
  EspecialistasScreenV2,
  RedeCredenciadaScreen,
  RedeAliceScreen,
  HomeScreen,
  HomeScreenV2,
  HomeScreenV3,
  HomeScreenV4,
  FiltersScreen,
  SettingsScreen,
}

const PHONE_W  = 375
const PHONE_H  = 812
const PADDING  = 48   // min breathing room around the phone

// __DS_SCREEN__ is injected by the Playground at download time so the
// correct screen renders when the file is opened locally (no query string).
const params     = new URLSearchParams(window.location.search)
const screenName = (window as unknown as Record<string, string>).__DS_SCREEN__
                ?? params.get('screen')
                ?? 'AgendamentoFlowScreen'
const Screen     = SCREENS[screenName] ?? AgendamentoFlowScreen

function calcScale() {
  const sh = (window.innerHeight - PADDING) / PHONE_H
  const sw = (window.innerWidth  - PADDING) / PHONE_W
  return Math.min(1, sh, sw)
}

function usePhoneScale() {
  const [scale, setScale] = useState(calcScale)   // sync initial value — no flash
  useEffect(() => {
    const update = () => setScale(calcScale())
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return scale
}

function ExportShell() {
  const scale = usePhoneScale()

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }}>
      {/* Outer shell — takes scaled dimensions in layout flow */}
      <div style={{
        width:     PHONE_W * scale,
        height:    PHONE_H * scale,
        flexShrink: 0,
        position:  'relative',
      }}>
        {/* Inner — native 375×812, scaled from top-left corner */}
        <div style={{
          width:           PHONE_W,
          height:          PHONE_H,
          position:        'absolute',
          top:             0,
          left:            0,
          transformOrigin: 'top left',
          transform:       `scale(${scale})`,
          borderRadius:    24,
          overflow:        'hidden',
          boxShadow:       '0 24px 80px rgba(0,0,0,0.6)',
        }}>
          <Screen />
        </div>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExportShell />
  </StrictMode>,
)
