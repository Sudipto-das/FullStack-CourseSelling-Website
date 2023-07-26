import React from "react";
import {useNavigate} from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Wellcome to <span style={{fontFamily:"monospace"}}>LearningAcademy</span>
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              <span style={{fontFamily:'cursive'}}>
              Transforming Education in the Digital Era In the ever-evolving
              landscape of education, online course platforms have emerged as a
              transformative force, revolutionizing the way individuals learn
              and acquire knowledge.
              </span>
             
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"></div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-64 overflow-hidden rounded-lg">
                        <img
                          src="src\assets\Free-Online-Courses-with-Certificates.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-64 overflow-hidden rounded-lg">
                        <img
                          src="src\assets\online-tutorials-concept_52683-37480.avif"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                style={{
                  fontSize:'1.2em',
                  fontWeight:'bolder',
                  padding: "0.4em 0.8em",
                  background: "blue",
                  borderRadius: "0.35em",
                  marginRight: "1em",
                  color: "white",
                  textAlign: "center",
                  alignItem: "center",
                  
                }}
                onClick={()=>{
                  navigate('/signup')
                }}
              >
                SIGNUP
              </button>
              <button
                style={{
                  fontSize:'1.2em',
                  fontWeight:'bolder',
                  padding: "0.4em 0.8em",
                  background: "blue",
                  borderRadius: "0.35em",
                  color: "white",
                  textAlign: "center",
                  alignItem: "center",
                }}
                onClick={()=>{
                  navigate('/signin')
                }}
              >
                SIGNIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
