import axios from 'axios';
import React, { useState } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, Button } from 'reactstrap'
import { Logo } from '../../assets'

const Navigation = (props) => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const logout = () => {
    axios.post('http://localhost:4000/v1/auth/logout', '', {
      withCredentials: true,
    })
      .then((res) => {
        alert('berhasil logout');
        return window.location.href = '/login';
      })
      .catch((err) => {
        alert('gagal logout')
      });
  }

  let menu;
  if(!props.user) {
    menu = (
      <>
        <NavItem className='ms-lg-4'>
          <NavLink href="/register">Daftar</NavLink>
        </NavItem>
        <NavItem className='ms-lg-4'>
          <a href="/login">
            <Button color='primary' outline className='px-4'>Masuk</Button>
          </a>
        </NavItem>
      </>
    );
  } else {
    menu = (
      <UncontrolledDropdown inNavbar nav>
        <DropdownToggle caret nav>{ props.user.name }</DropdownToggle>

        <DropdownMenu light end>
          <DropdownItem>
            <NavLink onClick={logout}>Logout</NavLink>
          </DropdownItem>
        </DropdownMenu>

      </UncontrolledDropdown>
    );
  }
  
  return (
    <Navbar color="light" expand="md" light className='shadow-sm px-0 px-lg-4'>
      <div className='col-md-1'>
        <a href='/'>
          <img className="img-fluid" src={Logo} alt="logo snc"/>
        </a>
      </div>

      <NavbarBrand href="/">Scholarship and Course</NavbarBrand>

      <NavbarToggler onClick={() => {setNavbarOpen(!isNavbarOpen)}} />

      <Collapse isOpen={isNavbarOpen} navbar>
        <Nav className="me-auto" navbar>

          <UncontrolledDropdown inNavbar nav className='ms-lg-4'>
            <DropdownToggle caret nav>Beasiswa</DropdownToggle>

            <DropdownMenu end light>
              <DropdownItem>
                <NavLink href="/scholarships">Pendidikan</NavLink>
              </DropdownItem>

              <DropdownItem>
                <NavLink href="/courses">Kursus</NavLink>
              </DropdownItem>
            </DropdownMenu>

          </UncontrolledDropdown>

          <NavItem className='ms-lg-4'>
            <NavLink href="/about">Tentang Kami</NavLink>
          </NavItem>

        </Nav>
        <Nav className="ms-auto" navbar>
          { menu }
        </Nav>
      </Collapse>

    </Navbar>
  )
}

export default Navigation
