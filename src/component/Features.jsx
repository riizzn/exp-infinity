import React from 'react'
import AnimatedUnderline from './AnimatedUnderline'

const Features = () => {
  return (
    <div  className="text-center mb-12 sm:mb-16 lg:mb-20 h-screen" >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-[#F8A61A] to-[#FDCE7E] bg-clip-text text-transparent">
                Modern Learning
              </span>
<AnimatedUnderline/>
              {/* <svg
                className="absolute -bottom-2 left-0 w-full h-3 svg-underline"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  id="myPath"
                  d="M2 10C50 5 100 2 198 8"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#F8A61A" />
                    <stop offset="100%" stopColor="#FDCE7E" />
                  </linearGradient>
                </defs>
              </svg> */}
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover innovative tools and capabilities designed to transform
            your learning experience and unlock your full potential with
            cutting-edge technology.
          </p>
        </div>
  )
}

export default Features