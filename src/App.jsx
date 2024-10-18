import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './Util/appStore';
import ScrollToTop from './ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import your pages
import Register from './Register.jsx';
import Starline from './Starline.jsx';
import Login from './Login.jsx';
import Imp from './IMP.jsx';
import Otp from './Otp';
import Otp2 from './Otp2';
import LandingIMP from './LandingPage/LandingIMP.jsx';
import AddFunds from './WALLET/AddFund.jsx';
import Win from './WIN/Win.jsx';
import Windata from './WIN/Windata.jsx';
import Bid from './BID/Bid.jsx';
import GameRates from './GameRates.jsx';
import Game from './Game.jsx';
import Htp from './HowToPlay.jsx';
import IMP3 from './WIN/IMP3.jsx';
import IMP4 from './BID/IMP4.jsx';
import IMP5 from './STARBID/IMP5.jsx';
import IMP6 from './STARWIN/IMP6.jsx';
import IMP7 from './WALLET/IMP7.jsx';
import IMP8 from './WALLET/IMP8.jsx';
import IMP9 from './WALLET/IMP9.jsx';
import Transaction from './WALLET/Transaction.jsx';
import MyModal from './ShowModal.jsx';
import Transfer from './WALLET/Transfer.jsx';
import TransferModel from './WALLET/TransferModel.jsx';
import AddFundHistory from './WALLET/AddFundHistroy.jsx';
import WithdrawRule from './WALLET/WithdrawRule.jsx';
import DepositRule from './WALLET/DepositRule.jsx';
import WithdrawHistory from './WALLET/WithdrawHistory.jsx';
import About from './About.jsx';
import Privacy from './Privacy.jsx';
import Delete from './Delete.jsx';
import Changepass from './Changepass.jsx';
import Wallet from './WALLET/Wallet.jsx';
import Profile from './Profile.jsx';
import IMP2 from './IMP2.jsx';
import WithdrawFunds from './WALLET/WithdrawFund.jsx';
import QR_PAY from './QR_PAY.jsx';
import StarGame from './StarGame.jsx';
import Ssinglepana from './Stargame/Ssinglepana.jsx';
import Sdoublepana from './Stargame/Sdoublepana.jsx';
import Stripplepana from './Stargame/Stripplepana.jsx';
import StarSingle from './Stargame/StarSingle.jsx';
import GALIGAME from './GALIGAME.jsx';
import GALIIMP from './GALIIMP.jsx';
import IMPWIN from './Gali_WIN/IMPWIN.jsx';
import IMPBID from './Gali_BID/IMPBID.jsx';
import GaliAllGame from './GaliAllGame.jsx';
import LeftDigit from './Gali_games/LeftDigit.jsx';
import RightDigit from './Gali_games/RightDigit.jsx';
import JodiDigit from './Gali_games/JodiDigit.jsx';
import Single from './Games/Single.jsx';
import FullSangam from './Games/FullSangam.jsx';
import HalfSangam from './Games/HalfSangam.jsx';
import TripplePana from './Games/TripplePana.jsx';
import SinglePana from './Games/SinglePana.jsx';
import DoublePana from './Games/DoublePana.jsx';
import Jodi from './Games/Jodi.jsx';
import MainLayout from './MainLayout';
import BasicLayout from './BasicLayout';
import History from './History.jsx';
import ForgotPassword from "./forgetpassword.jsx";
function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Routes with MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route path="/star" element={<Starline />} />
            <Route path="/imp3" element={<IMP3 />} />
            <Route path="/imp4" element={<IMP4 />} />
            <Route path="/imp5" element={<IMP5 />} />
            <Route path="/imp6" element={<IMP6 />} />
            <Route path="/imp7" element={<IMP7 />} />
            <Route path="/imp8" element={<IMP8 />} />
            <Route path="/imp9" element={<IMP9 />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/mymodel" element={<MyModal />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/transfermodel" element={<TransferModel />} />
            <Route path="/addfundhistory" element={<AddFundHistory />} />
            <Route path="/withdrawrule" element={<WithdrawRule />} />
            <Route path="/depositrule" element={<DepositRule />} />
            <Route path="/withdrawhistory" element={<WithdrawHistory />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/change" element={<Changepass />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stargame" element={<StarGame />} />
            <Route path="/ssinglepana" element={<Ssinglepana />} />
            <Route path="/sdoublepana" element={<Sdoublepana />} />
            <Route path="/stripplepana" element={<Stripplepana />} />
            <Route path="/starsingle" element={<StarSingle />} />
            <Route path="/galigame" element={<GALIGAME />} />
            <Route path="/galiIMP" element={<GALIIMP />} />
            <Route path="/impwin" element={<IMPWIN />} />
            <Route path="/impbid" element={<IMPBID />} />
            <Route path="/galiallgame" element={<GaliAllGame />} />
            <Route path="/leftdigit" element={<LeftDigit />} />
            <Route path="/rightdigit" element={<RightDigit />} />
            <Route path="/jodidigit" element={<JodiDigit />} />
            <Route path="/single" element={<Single />} />
            <Route path="/fullsangam" element={<FullSangam />} />
            <Route path="/halfsangam" element={<HalfSangam />} />
            <Route path="/tripplepana" element={<TripplePana />} />
            <Route path="/doublepana" element={<DoublePana />} />
            <Route path="/singlepana" element={<SinglePana />} />
            <Route path="/jodi" element={<Jodi />} />

            
            <Route path="/otp2" element={<Otp2 />} />
            <Route path="/addfund" element={<AddFunds />} />
            <Route path="/win" element={<Win />} />
            <Route path="/windata" element={<Windata />} />
            <Route path="/bid" element={<Bid />} />
            <Route path="/gameRates" element={<GameRates />} />
            <Route path="/game" element={<Game />} />
            <Route path="/htp" element={<Htp />} />
            <Route path="/imp2" element={<IMP2 />} />
            <Route path="/withdraw" element={<WithdrawFunds />} />
            <Route path="/qrpay" element={<QR_PAY />} />
            <Route path="/imp" element={<Imp />} />
            <Route path='/histories' element={<History/>}/>
          </Route>
          
          {/* Routes with BasicLayout */}
          <Route element={<BasicLayout />}>
          <Route index element={<LandingIMP />} />
            <Route path="/r" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpass" element={<ForgotPassword />}/>
            <Route path="/otp" element={<Otp />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
}

export default App;
