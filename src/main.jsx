import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoginProvider } from './Contaxt/Login_Contaxt.jsx'
import { PartnerLoginProvider } from './Contaxt/PartnarLogin_context.jsx'
import { FilterProvider } from './Contaxt/Filter_contaxt.jsx'
import { Listing_Provider } from './AfterLogin_Pages/Listing_contaxt/Listing_Contaxt.jsx'
import { APIProvider } from './Contaxt/ALL_APi_Call/API_Call_Contaxt.jsx'
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginProvider>
      <PartnerLoginProvider>
        <FilterProvider>
         <Listing_Provider>
            <APIProvider>
              <App />
            </APIProvider>
         </Listing_Provider>
        </FilterProvider>
      </PartnerLoginProvider>
    </LoginProvider>
  </StrictMode>,
)
