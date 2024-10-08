'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../utils/icons/Honeywell_Logo_RGB_Red.jpg';
import Globe from '../utils/icons/hon-globe-15px.png';
import User from '../utils/icons/user.svg';
import Cart from '../utils/icons/ShoppingCart.svg';
import Magify from '../utils/icons/magify_black.svg';
import DropdownModel from '../components/DropdownModel';
import SoldToDrpdown from '../components/SoldToDrpdown';
import SearchBar from '../components/SearchBarW';

const Header = ({ detailData = {}, contactData, error }) => {
  const dropdownOpen1 = false;

  // Safely access session_valid using optional chaining
  const [signedIn, setSignedIn] = useState(detailData?.session_valid || false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [soldToOpen, setSoldToOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [toggleSearchBox, setToggleSearchBox] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('');

  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionValid = localStorage.getItem('session_valid');
      const selectedAcc = localStorage.getItem('selectedAccount') || '';
      setSignedIn(sessionValid === 'true');
      setSelectedAccount(selectedAcc);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (detailData.session_valid) {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('session_valid', 'true');
      } else {
        localStorage.setItem('userLoggedIn', 'false');
        localStorage.setItem('session_valid', 'false');
      }
    }
  }, [detailData.session_valid]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
    if (soldToOpen) setSoldToOpen(false);
    if (currencyOpen) setCurrencyOpen(false);
  };

  const soldToClick = (e) => {
    e.stopPropagation();
    setSoldToOpen(true);
    if (dropdownOpen) setDropdownOpen(false);
    if (currencyOpen) setCurrencyOpen(false);
  };

  const currencyHandler = (e) => {
    e.stopPropagation();
    setCurrencyOpen(true);
    if (dropdownOpen) setDropdownOpen(false);
    if (soldToOpen) setSoldToOpen(false);
  };

  const ToggleSearchBox = (e) => {
    e.stopPropagation();
    setToggleSearchBox(true);
  };

  return (
    <div className="Header">
      <header className='top-nav'>
        <nav>
          <ul className='top-links'>
            <li>
              <span>
                <Image src={Globe} alt="Honeywell globe icon" />
                <Link href="#">United States(EN)</Link>
              </span>
            </li>
            <li><Link href="#">Contact</Link></li>
            {detailData.session_valid && (
              <li onClick={currencyHandler}>
                <Link href="#">
                  CURRENCY:{"currencydata"}
                  <span></span>
                </Link>
                {detailData.session_valid && dropdownOpen && (
                  <DropdownModel signedin={detailData.session_valid} 
                    username={detailData.given_name} 
                    setSignedIn={setSignedIn} />
                )}
              </li>
            )}
            {detailData.session_valid && (
              <li onClick={soldToClick}>
                <Link href="#">
                  ACCT:{selectedAccount || "Select Account"}
                  <span></span>
                </Link>
                {detailData.session_valid && soldToOpen && (
                  <SoldToDrpdown contactData={contactData} setSelectedAccount={setSelectedAccount} setSoldToOpen={setSoldToOpen} />
                )}
              </li>
            )}
            <li onClick={toggleDropdown}>
              <Link href="#">
                <span><Image src={User} alt="Honeywell user icon" className='user-icon' /></span>
                <span>{!detailData.session_valid ? "Sign In" : detailData.given_name}</span>
              </Link>
              {dropdownOpen && (
                <DropdownModel signedin={detailData.session_valid} 
                  username={detailData.given_name} />
              )}
            </li>
            <li><Link href="#">Bulk Order</Link></li>
            <li><Link href="#"><Image src={Cart} alt="Honeywell shopping cart icon" className='cart-icon' /></Link></li>
          </ul>
        </nav>
      </header>

      <header className='bottom-nav'>
        <div className="header-container">
          <div className="logo-container">
            <Link href="https://buildings.honeywell.com/us/en/ecommerce">
              <Image src={Logo} alt="Honeywell Building Automation" />
            </Link>
          </div>
          <div>
            <h2>Building Automation</h2>
          </div>
        </div>
        <div className='navSection'>
          <nav>
            <ul className='bottom-links'>
              <li><Link href="#">Product</Link></li>
              <li>
                <Link href="#">Industries</Link>
                {dropdownOpen1 && (
                  <ul className="dropdown-menu">
                    <li><Link href="#">Commercial Buildings</Link></li>
                    <li><Link href="#">Healthcare Facilities</Link></li>
                    <li><Link href="#">Industrial Facilities</Link></li>
                  </ul>
                )}
              </li>
              <li><Link href="#">Brands</Link></li>
              <li><Link href="#">Support</Link></li>
              <li><Link href="#">News Events</Link></li>
              <li onClick={ToggleSearchBox}>
                <Link href="#">
                  <Image src={Magify} alt="Honeywell search icon" className='search-icon' />
                </Link>
                {toggleSearchBox && <SearchBar setToggleSearchBox={setToggleSearchBox} />}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;