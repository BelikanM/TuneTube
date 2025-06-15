// Navbar.jsx
import React, { useState } from 'react';
import { FiHome, FiCompass, FiUpload, FiUser } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiSearchLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/')[1] || 'home');
  const [showSearch, setShowSearch] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab !== 'search') setShowSearch(false);
  };

  return (
    <NavbarContainer>
      <NavHeader>
        <AppName>Wave</AppName>
        <IconsContainer>
          <IconButton onClick={() => setShowSearch(!showSearch)}>
            <RiSearchLine />
          </IconButton>
          <IconButton>
            <IoMdNotificationsOutline />
            <NotificationBadge>3</NotificationBadge>
          </IconButton>
        </IconsContainer>
      </NavHeader>

      {showSearch && (
        <SearchContainer>
          <SearchInput placeholder="Rechercher..." />
        </SearchContainer>
      )}

      <NavTabs>
        <NavItem 
          to="/home" 
          active={activeTab === 'home'} 
          onClick={() => handleTabClick('home')}
        >
          <FiHome />
          <span>Accueil</span>
        </NavItem>
        
        <NavItem 
          to="/library" 
          active={activeTab === 'library'} 
          onClick={() => handleTabClick('library')}
        >
          <FiCompass />
          <span>Découvrir</span>
        </NavItem>
        
        <NavItem 
          to="/upload" 
          active={activeTab === 'upload'} 
          onClick={() => handleTabClick('upload')}
        >
          <FiUpload />
          <span>Upload</span>
        </NavItem>
        
        <NavItem 
          to="/profile" 
          active={activeTab === 'profile'} 
          onClick={() => handleTabClick('profile')}
        >
          <FiUser />
          <span>Profil</span>
        </NavItem>
      </NavTabs>
    </NavbarContainer>
  );
};

// Styles avec styled-components
const NavbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const NavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
`;

const AppName = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #25D366;
  margin: 0;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #666;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    color: #25D366;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
`;

const SearchContainer = styled.div`
  padding: 10px 20px;
  background-color: #f8f8f8;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 0.9rem;
  transition: all 0.3s;

  &:focus {
    border-color: #25D366;
    box-shadow: 0 0 0 2px rgba(37, 211, 102, 0.2);
  }
`;

const NavTabs = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;
  font-size: 0.8rem;
  transition: all 0.3s;
  padding: 5px 10px;
  position: relative;

  svg {
    font-size: 1.4rem;
    margin-bottom: 3px;
  }

  ${({ active }) => active && css`
    color: #25D366;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 5px;
      height: 5px;
      background-color: #25D366;
      border-radius: 50%;
    }
  `}

  &:hover {
    color: #25D366;
    transform: translateY(-3px);
  }
`;

export default Navbar;

