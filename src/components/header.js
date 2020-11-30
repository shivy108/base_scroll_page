import React from "react";
import { AiFillLinkedin, AiFillGithub, AiOutlineMail } from "react-icons/ai";

export default function Header() {
  return (
    <header>
      <div className='header-inner'>
        <div className='wrapper'>
          <div className='logo'>
            shiv<div className='dot'>.</div>
          </div>
          <div className='logo1'>
            software <div className='logo2'>developer</div>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <a href='mailto:shiveshdindayal@gmail.com'>
                <AiOutlineMail />
              </a>
            </li>
            <li>
              <a
                href='https://www.linkedin.com/in/shivesh-dindayal-25291a111/'
                target='_blank'
                rel='noreferrer'>
                <AiFillLinkedin />
              </a>
            </li>
            <li>
              <a
                href='https://github.com/shivy108'
                target='_blank'
                rel='noreferrer'>
                <AiFillGithub />
              </a>
            </li>
            <li className='btn'>
              <a href='/'>play</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
