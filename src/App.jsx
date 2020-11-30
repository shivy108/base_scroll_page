import { Html } from "drei";
import { Suspense, useEffect, useRef, useState } from "react";
import InView, { useInView } from "react-intersection-observer";
import { useSpring, a } from "react-spring/three";
import { Canvas, useFrame } from "react-three-fiber";
import "./App.scss";
import Header from "./components/header";
import { Section } from "./components/section";
import state from "./components/state";
import laptop from "./assets/laptop.png";
import netflix from "./assets/netflix.jpg";

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Diretion light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
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

const HTMLContent = ({ bgColor, domContent, children, position }) => {
  const [refItem, InView] = useInView({ threshold: 0 });

  useEffect(() => {
    InView && (document.body.style.background = bgColor);
  }, [InView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={position}>
        <Html portal={domContent} fullscreen>
          <div className='container' ref={refItem}>
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
};

// const Box = ({ position, color, speed, args }) => {
//   const mesh = useRef();

//   //useFrame allows us to re-render/update rotation on each frame
//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

//   //Basic expand state
//   const [expand, setExpand] = useState(false);
//   // React spring expand animation
//   const props = useSpring({
//     scale: expand ? [50, 50, 50] : [50, 50, 50],
//   });
//   return (
//     <group>
//       <a.mesh
//         position={position}
//         ref={mesh}
//         onClick={() => setExpand(!expand)}
//         scale={props.scale}
//         castShadow>
//         <boxBufferGeometry attach='geometry' args={args} />
//         <MeshWobbleMaterial
//           color={color}
//           speed={speed}
//           attach='material'
//           factor={0.6}
//         />
//       </a.mesh>
//     </group>

//   );
// };

function App() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }, []));

  return (
    <>
      <Header />
      <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={null}>
          {/* <Box position={[0, 0, 0]} color='black' speed={1} args={[3, 2, 1]} /> */}
          <HTMLContent
            bgColor={"#f15946"}
            domContent={domContent}
            position={[0, 250, 0]}>
            <h1 className='title'>Welcome</h1>
            <h4 className='subtitle'> Take a look around</h4>
            <div className='arrow'>arrowdown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#229235"}
            domContent={domContent}
            position={[0, 0, 0]}>
            <h1 className='title'>jobtracker.ai</h1>
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
                generation from the user and job data. I worked on the frontend
                to create the user profile UI as well as cv and cover letter
                templates.{" "}
              </p>
            </div>
            <img src={laptop} alt='' />
            <div className='arrow'>arrowdown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#a33838"}
            domContent={domContent}
            position={[0, -250, 0]}>
            <h1 className='title'>netflix clone</h1>
            <ul className='list'>
              <li className='tech'>react</li>
              <li className='tech'>typescript</li>
              <li className='tech'>styled components</li>
              <li className='tech'>firebase</li>
            </ul>
            <div className='description'>
              <h4>description</h4>
              <p>
                a clone of the netflix web application. This clone does not play
                full movies, instead it plays a trailer from youtbe{" "}
              </p>
            </div>
            <img src={netflix} alt='' />
            <div className='arrow'>arrowdown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#7aa338"}
            domContent={domContent}
            position={[0, -500, 0]}>
            <h1 className='title'>scholl garten und dach</h1>
            <ul className='list'>
              <li className='tech'>react</li>
              <li className='tech'>react-spring</li>
              <li className='tech'>firebase</li>
            </ul>
            <div className='description'>
              <h4>description</h4>
              <p>
                a static webpage built to be mobile friendly and stand out from
                the crowd. The domain was bought from hostpoint.ch and deployed
                with Netlify.{" "}
              </p>
            </div>
            <img src={netflix} alt='' />
            <div className='arrow'>arrowdown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#6d6565"}
            domContent={domContent}
            position={[0, -750, 0]}>
            <h1 className='title'>online shop</h1>
            <ul className='list'>
              <li className='tech'>react</li>
              <li className='tech'>styled components</li>
              <li className='tech'>firebase</li>
            </ul>
            <div className='description'>
              <h4>description</h4>
              <p>fully functional online shop </p>
            </div>
            <img src={netflix} alt='' />
            <div className='arrow'>arrowdown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#5857ac"}
            domContent={domContent}
            position={[0, -1000, 0]}>
            <h1 className='title'>discovery</h1>
            <ul className='list'>
              <li className='tech'>react</li>
              <li className='tech'>redux</li>
              <li className='tech'>material ui</li>
            </ul>
            <div className='description'>
              <h4>description</h4>
              <p>
                Inspired by COVID-19. Created to encourage medical research and
                increase medical data.{" "}
              </p>
            </div>
            <img src={netflix} alt='' />
            <div className='arrow'>arrowdown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#a1a338"}
            domContent={domContent}
            position={[0, -1250, 0]}>
            <h1 className='title'>stundä</h1>
            <ul className='list'>
              <li className='tech'>Angular</li>
              <li className='tech'>styled components</li>
              <li className='tech'>firebase</li>
            </ul>
            <div className='description'>
              <h4>description</h4>
              <p>
                Inspired by my time working as a garden. This is an app used to
                record working hours{" "}
              </p>
            </div>
            <img src={netflix} alt='' />
            <div className='arrow'>arrowdown</div>
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
