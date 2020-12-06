import { Html, MeshWobbleMaterial } from "drei";
import { Suspense, useEffect, useRef, useState } from "react";
import InView, { useInView } from "react-intersection-observer";
import { Canvas, useFrame } from "react-three-fiber";
import "./App.scss";
import Header from "./components/header";
import { Section } from "./components/section";
import state from "./components/state";
import laptop from "./assets/laptop.png";
import netflix from "./assets/netflix.jpg";
import nike from "./assets/nike-1.gif";
import scholl from "./assets/SVGLogo.svg";

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
  useFrame(
    () => (
      (mesh.current.rotation.z += 0.001),
      (mesh.current.rotation.x -= 0.002),
      (mesh.current.rotation.y -= 0.001)
    )
  );

  return (
    <mesh position={position} ref={mesh} scale={[40, 40, 40]} castShadow>
      <sphereGeometry args={[1, 16, 16]} />
      <MeshWobbleMaterial
        color={color}
        speed={speed}
        attach="material"
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
            className="container"
            onClick={() =>
              setColor(pallete[Math.floor(Math.random() * pallete.length)])
            }
            ref={refItem}
          >
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
    <div onMouseOver={scrambleWords} className="arrow">
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
      <div className="loading">Loading...</div>
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
        camera={{ position: [0, 0, 120], fov: 70 }}
      >
        <Lights />
        <Suspense fallback={Loading}>
          
          <SpinningMesh
            position={[0, 1, 0]}
            color="#353030"
            args={[3, 2, 1]}
            speed={0.1}
            factor={0.1}
          />
          <SpinningMesh
            position={[-10, -10, -10]}
            color="#221c1c"
            args={[3, 2, 1]}
            speed={0.01}
            factor={3}
          />
          <SpinningMesh
            position={[10, 10, 10]}
            color="#221c1c"
            args={[3, 2, 1]}
            speed={0.01}
            factor={2}
          />

          <HTMLContent
            bgColor={"#6d6d60"}
            domContent={domContent}
            position={[0, 250, 0]}
          >
            <h1 className="title">Welcome</h1>
            <h4 className="subtitle"> Take a look around</h4>
            <Arrow />
          </HTMLContent>
          <HTMLContent
            bgColor={"#a38a38"}
            domContent={domContent}
            position={[0, 0, 0]}
          >
            <h1 className="title">jobtracker.ai</h1>
            <ul className="list">
              <li className="tech">react</li>
              <li className="tech">styled components</li>
              <li className="tech">django</li>
              <li className="tech">redux</li>
              <li className="tech">react-pdf</li>
              <li className="tech">docker</li>
            </ul>
            <div className="description">
              <h4>description</h4>
              <p>
                jobtracker.ai is a tool to help developers find and apply for
                jobs. The objective was to add automatic cv and cover letter
                generation from the user data. I worked on the frontend UI which
                updates the user profile as well as creating cv and cover letter
                templates.{" "}
              </p>
            </div>
            <img src={laptop} alt="" />
            <div className="arrow">scrolldown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#83aa9a"}
            domContent={domContent}
            position={[0, -250, 0]}
          >
            <h1 className="title">netflix clone</h1>
            <ul className="list">
              <li className="tech">react</li>
              <li className="tech">typescript</li>
              <li className="tech">styled components</li>
              <li className="tech">firebase</li>
            </ul>
            <div className="description">
              <h4>description</h4>
              <p>
                a clone of the netflix web application. This clone does not play
                full movies, instead it plays a trailer from youtbe{" "}
              </p>
            </div>
            <img src={netflix} alt="" />
            <div className="arrow">scrolldown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#527252"}
            domContent={domContent}
            position={[0, -500, 0]}
          >
            <h1 className="title">scholl garten und dach</h1>
            <ul className="list">
              <li className="tech">react</li>
              <li className="tech">react-spring</li>
              <li className="tech">Netlify</li>
            </ul>
            <div className="description">
              <h4>description</h4>
              <p>
                a static webpage built to be mobile friendly and stand out from
                the crowd.
              </p>
            </div>
            <img src={scholl} alt="" />
            <div className="arrow">scrolldown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#687567"}
            domContent={domContent}
            position={[0, -750, 0]}
          >
            <h1 className="title">online shop</h1>
            <ul className="list">
              <li className="tech">react</li>
              <li className="tech">styled components</li>
              <li className="tech">firebase</li>
            </ul>
            <div className="description">
              <h4>description</h4>
              <p>fully functional online shop </p>
            </div>
            <img src={nike} alt="" />
            <div className="arrow">scrolldown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#9e92ac"}
            domContent={domContent}
            position={[0, -1000, 0]}
          >
            <h1 className="title">discovery</h1>
            <ul className="list">
              <li className="tech">react</li>
              <li className="tech">redux</li>
              <li className="tech">material ui</li>
              <li className="tech">django</li>
            </ul>
            <div className="description">
              <h4>description</h4>
              <p>
                Inspired by COVID-19. Created to encourage medical research and
                increase medical data.{" "}
              </p>
            </div>
            <img src={nike} alt="" />
            <div className="arrow">scrolldown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#9c5c87"}
            domContent={domContent}
            position={[0, -1250, 0]}
          >
            <h1 className="title">stundä</h1>
            <ul className="list">
              <li className="tech">Angular</li>
              <li className="tech">Django</li>
              <li className="tech">AWS</li>
            </ul>
            <div className="description">
              <h4>description</h4>
              <p>
                Inspired by my time working as a gardener. This is an app used
                to record working hours{" "}
              </p>
            </div>
            <img src={netflix} alt="" />
            <div className="arrow">scrolldown</div>
          </HTMLContent>
          <HTMLContent
            bgColor={"#c47c7c"}
            domContent={domContent}
            position={[0, -1500, 0]}
          >
            <h1 className="title">like what you see?</h1>
            <h4 className="subtitle"> Get in touch...</h4>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}></div>
      </div>
    </>
  );
}

export default App;
