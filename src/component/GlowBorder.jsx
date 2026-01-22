import React from 'react'

export const GlowBorder = () => {
  return (
    <div className="container">
        <div className="card flex items-center justify-center">
            <div className="box relative flex items-center justify-center h-[50vh] w-[70vw] max-w-[400px] max-h-[500px] bg-red-300 p-5">
                <div className="glass"></div>
                <div className="content flex items-center justify-center">
                    <h1></h1>
                </div>
            </div>
        </div>
    </div>

  )
}
