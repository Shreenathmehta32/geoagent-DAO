import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-background">
                <Routes>
                    <Route path="/" element={<Landing />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
