import { Html, MeshWobbleMaterial } from "drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Canvas, useFrame } from "react-three-fiber";
import "./App.scss";
import Header from "./components/header";
import { Section } from "./components/section";
import state from "./components/state";
import laptop from "./assets/laptop.png";
import netflix from "./assets/netflix.jpg";
import scholl from "./assets/SVGLogo.svg";
import nike from "./assets/nike-1.gif";

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Diretion light */}
      <directionalLight position={[-10, -10, 5]} intensity={1} />
      <pointLight position={[0, 10, 5]} />
      <pointLight position={[0, -10, -5]} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </>
  );
};

const SpinningMesh = ({ factor, position, color, speed, args }) => {
  //ref to target the mesh
  const mesh = useRef();

  //useFrame allows us to re-render/update rotation on each frame
  useFrame(() => (mesh.current.rotation.z += 0.001));

  return (
    <mesh position={position} ref={mesh} scale={[40, 40, 40]} castShadow>
      <sphereGeometry args={[1, 16, 16]} />
      <MeshWobbleMaterial
        color={color}
        speed={speed}
        attach='material'
        factor={factor}
        wireframe
      />
    </mesh>
  );
};

const HTMLContent = ({ bgColor, domContent, children, position }) => {
  const [refItem, InView] = useInView({ threshold: 0 });
  const [color, setColor] = useState(bgColor);
  const pallete = [
    "#f89672",
    "#4b7c9b",
    "#796c58",
    "#667c66",
    "#486292",
    "#be759a",
    "#487c78",
    "#753e3e",
    "#887719",
    "#948114",
    "#51856b",
  ];

  useEffect(() => {
    InView && (document.body.style.background = color);
  }, [InView, color]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={position}>
        <Html portal={domContent} fullscreen>
          <div
            className='container'
            onClick={() =>
              setColor(pallete[Math.floor(Math.random() * pallete.length)])
            }
            ref={refItem}>
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
};

const Arrow = () => {
  const [x, setX] = useState("r");
  const [y, setY] = useState("w");
  const [z, setZ] = useState("o");
  const [a, setA] = useState("a");
  const [b, setB] = useState("s");
  const [c, setC] = useState("p");
  const [d, setD] = useState("q");
  const [e, setE] = useState("g");

  let characters =
    "!@#$%^&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  const charList = characters.split("");

  const scrambleWords = (e) => {
    if (e) {
      return (
        setX(charList[Math.floor(Math.random() * charList.length)]),
        setA(charList[Math.floor(Math.random() * charList.length)]),
        setB(charList[Math.floor(Math.random() * charList.length)]),
        setC(charList[Math.floor(Math.random() * charList.length)]),
        setD(charList[Math.floor(Math.random() * charList.length)]),
        setE(charList[Math.floor(Math.random() * charList.length)]),
        setZ(charList[Math.floor(Math.random() * charList.length)]),
        setY(charList[Math.floor(Math.random() * charList.length)])
      );
    }
  };
  return (
    <div onMouseOver={scrambleWords} className='arrow'>
      <div>
        {x}
        {y}
      </div>
      <div>
        {a}
        {z}
      </div>
      <div>
        {b}
        {c}
      </div>
      <div>scrolldown</div>
      <div>
        {d}
        {z}
        {e}
        {a}
        {b}
        {d}
        {c}
        {y}
      </div>
      <div>
        {x}
        {a}
        {d}
        {e}
        {b}
        {z}
      </div>
      <div>
        {c}
        {a}
        {z}
        {d}
      </div>
      <div>
        {d}
        {e}
      </div>
      <div>{a}</div>
    </div>
  );
};

const Loading = () => {
  return (
    <>
      <div className='loading'>Loading...</div>
    </>
  );
};

function App() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }, []));

  return (
    <>
      <Header />
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={Loading}>
          <SpinningMesh
            position={[0, 1, 0]}
            color='#353030'
            args={[3, 2, 1]}
            speed={0.1}
            factor={0.1}
          />
          <SpinningMesh
            position={[-10, -10, -10]}
            color='#221c1c'
            args={[3, 2, 1]}
            speed={0.01}
            factor={3}
          />
          <SpinningMesh
            position={[10, 10, 10]}
            color='#221c1c'
            args={[3, 2, 1]}
            speed={0.01}
            factor={2}
          />

          <HTMLContent
            bgColor={"#6d6d60"}
            domContent={domContent}
            position={[0, 250, 0]}>
            <h1 className='title'>Welcome</h1>
            <h4 className='subtitle'> Take a look around</h4>
            <Arrow />
          </HTMLContent>
          <HTMLContent
            bgColor={"#a38a38"}
            domContent={domContent}
            position={[0, 0, 0]}>
            <h1 className='title'>
              <a href='https://jobtracker.ai/' target='_blank'
                rel='noreferrer' >
                jobtracker.ai
              </a>
            </h1>
            <ul className='list'>
              <li className='tech'>react</li>
              <li className='tech'>styled components</li>
              <li className='tech'>django</li>
              <li className='tech'>redux</li>
              <li className='tech'>react-pdf</li>
              <li className='tech'>docker</li>
            </ul>
            <div className='description'>
              <h4>description</h4>
              <p>
                jobtracker.ai is a tool to help developers find and apply for
                jobs. The objective was to add automatic cv and cover letter
                generation from the user data. Please download my resume for an example of the resume.
                The key skills gained from this
                project were working with redux state, interacting with the django
                server to update the user profile ,implementing react-pdf to
                add customisation of pdf documents and dockerizing the app
                 which is being served on a linux container {" "}
              </p>
            </div>
            <a href='https://jobtracker.ai/' target='_blank'
              rel='noreferrer'>
              <img src={laptop} alt='' />
            </a>

            <div className='arrow'>scrolldown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#687567"}
            domContent={domContent}
            position={[0, -250, 0]}>
            <h1 className='title'><a href="http://167.99.252.53/" rel='noreferrer' target='_blank'>base.</a></h1>
            <ul className='list'>
              <li className='tech'>angular 9</li>
              <li className='tech'>sass</li>
              <li className='tech'>bootsrap</li>
              <li className='tech'>redis</li>
              <li className='tech'>typescript</li>
              <li className='tech'>c#</li>
              <li className='tech'>asp.net core</li>
              <li className='tech'>stripe</li>
            </ul>
            <div className='description'>
              <h4>description</h4>
              <p>A fully functional online shop with stripe credit card payments. please excuse the http status, this verison
              is only for demonstration purposes. Testing of the credit card payment can be done with the card number 4242 4242 4242 4242 for success
              and 4000000000000002 for a card declined response. Sign up can be done with a fake email address. A possible extension to this website could be
              an audit proof accounting system
                recording inventory movements, sales, purchases and monthly management reports. At the moment it is not a responsive design. Please view on desktop</p>
            </div>
            <a href="http://167.99.252.53/" rel='noreferrer' target='_blank'><img src={nike} alt='' /></a>

            <div className='arrow'>scrolldown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#527252"}
            domContent={domContent}
            position={[0, -500, 0]}>
            <h1 className='title'>
              <a
                href='https://scholl-garten-dach.ch/'
                target='_blank'
                rel='noreferrer'>
                scholl garten und dachservice
              </a>
            </h1>
            <ul className='list'>
              <li className='tech'>react</li>
              <li className='tech'>react-spring</li>
              <li className='tech'>Netlify</li>
            </ul>
            <div className='description'>
              <h4>description</h4>
              <p>
                A static webpage built to be mobile friendly and stand out from
                the crowd. The domain was aquired from hostpoint and the site
                is deployed using netlify. Also added to the Google SEO.
              </p>
            </div> <a
              href='https://scholl-garten-dach.ch/'
              target='_blank'
              rel='noreferrer'>
              <img src={scholl} alt='' />
            </a>

            <div className='arrow'>scrolldown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#83aa9a"}
            domContent={domContent}
            position={[0, -750, 0]}>
            <h1 className='title'>
              <a
                href='https://netflix130678.web.app/'
                rel='noreferrer'
                target='_blank'>
                netflix clone
              </a>
            </h1>
            <ul className='list'>
              <li className='tech'>react</li>
              <li className='tech'>typescript</li>
              <li className='tech'>styled components</li>
              <li className='tech'>firebase</li>
            </ul>
            <div className='description'>
              <h4>description</h4>
              <p>
                A clone of the netflix web application. This clone does not play
                full movies, instead it plays a trailer from youtbe{" "}
              </p>
            </div>
            <a
              href='https://netflix130678.web.app/'
              rel='noreferrer'
              target='_blank'>
              <img src={netflix} alt='' />
            </a>

            <div className='arrow'>scrolldown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#c47c7c"}
            domContent={domContent}
            position={[0, -1000, 0]}>
            <h1 className='title'>like what you see?</h1>
            <h4 className='subtitle'> Get in touch...</h4>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <div className='scrollArea' ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}></div>
      </div>
    </>
  );
}

export default App;
