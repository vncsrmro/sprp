import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TermosDeUso from './pages/TermosDeUso';
import PoliticaDePrivacidade from './pages/PoliticaDePrivacidade';
import LGPD from './pages/LGPD';
import PainelCidadao from './pages/PainelCidadao';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/painel" element={<PainelCidadao />} />
            <Route path="/termosdeuso" element={<TermosDeUso />} />
            <Route path="/politicadeprivacidade" element={<PoliticaDePrivacidade />} />
            <Route path="/lgpd" element={<LGPD />} />
        </Routes>
    );
}

export default App;

export default App;
