import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';
import { GenreProvider } from './hooks/useGenre';

export function App() {
  return (
    <GenreProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar></SideBar>
        <Content></Content>
      </div>
    </GenreProvider>
  )
}