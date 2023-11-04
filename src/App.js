import React, { useState } from 'react';
import { format } from 'date-fns';
import bgMobile from './images/bg-main-mobile.png';
import bgDesktop from './images/bg-main-desktop.png';
import logo from './images/card-logo.svg';
import tick from './images/icon-complete.svg';

function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('01/23');
  const [cvc, setCvc] = useState('');

  return (
    <section className="App">
      <div className="absolute -z-10 w-full">
        <picture>
          <source media="(min-width: 768px)" srcSet={bgDesktop} />
          <img src={bgMobile} alt="bg" className="w-full lg:w-1/3 " />
        </picture>
      </div>

      <div className="container grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
        <div className="mt-10 mx-5 grid grid-cols-1 gap-4 lg:gap-0 ">
          <article className="front-card p-5 flex flex-col justify-between">
            <img src={logo} alt="logo" className="w-20 lg:w-25" />
            <div className="">
              <h2 className="text-white text-xl lg:text-3xl tracking-widest">
                {cardNumber || '0000 0000 0000 0000'}
              </h2>
              <ul className="flex mt-3 items-center justify-between text-white uppercase text-base lg:text-xl tracking-widest">
                <li>
                  {cardHolder || 'Salma Hassan'}
                </li>
                <li>
                  {expiryDate ? format(new Date(expiryDate), 'MM/yy') : '01/23'}
                </li>
              </ul>
            </div>
          </article>
          <article className="back-card relative lg:ml-20">
            <p className="absolute text-white lg:right-10  right-16 text-lg lg: text-xl tracking-widest ">
              {cvc || '123'}
            </p>
          </article>
        </div>
        <div className="pt-8 px-5 pb-20">
          {!confirmed
          && (
          <form className="flex flex-col justify-center lg:h-screen mx-auto gap-8 max-w-lg">
            <div>
              <label htmlFor="cardholder_name">
                Cardholder Name
                <input
                  type="text"
                  id="cardholder_name"
                  name="cardholder_name"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="e.g. Salma Hassan"
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="card_number">
                Card Number
                <input
                  type="text"
                  id="card_number"
                  value={cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()}
                  onChange={(e) => setCardNumber(e.target.value)}
                  name="card_number"
                  placeholder="e.g. 1234 5678 9123 4567"
                  required
                  maxLength={19}
                />
              </label>
            </div>
            <article className="flex items-center justify-between gap-8">
              <div className="flex-1">
                <label htmlFor="expiry_date">
                  Exp. Date (MM.YY)
                  <input
                    type="month"
                    id="expiry_date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    name="expiry_date"
                    placeholder="e.g. 01/23"
                    required
                  />
                </label>
              </div>
              <div className="flex-1">
                <label htmlFor="cvc">
                  CVC
                  <input
                    type="number"
                    id="cvc"
                    name="cvc"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="e.g. 123"
                    maxLength={3}
                    required
                  />
                </label>
              </div>
            </article>
            <button className="submit-btn" type="submit" onClick={() => setConfirmed(true)}> Confirm </button>
          </form>
          )}
          {confirmed && (
          <FormSubmitted
            setConfirmed={setConfirmed}
            setCardHolder={setCardHolder}
            setCardNumber={setCardNumber}
            setExpiryDate={setExpiryDate}
            setCvc={setCvc}
          />
          )}
        </div>
      </div>
    </section>
  );
}

function FormSubmitted({
  setConfirmed, setCardNumber, setCardHolder, setExpiryDate, setCvc,
}) {
  const handleSubmit = () => {
    setCardNumber('');
    setCardHolder('');
    setExpiryDate('01/23');
    setCvc('');
    setConfirmed(false);
  };
  return (
    <div className="flex flex-col items-center justify-center lg:h-screen">
      <img src={tick} alt="tick" className="block mx-auto" />
      <h1 className="text-slate-800 text-3xl my-6 uppercase text-center">Thank You</h1>
      <p className="text-slate-400 text-center">
        We&aposve added your card successfully
      </p>
      <button
        className="submit-btn block mx-auto mt-10"
        type="submit"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  );
}

export default App;
