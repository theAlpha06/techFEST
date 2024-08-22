import React from 'react'
// import './userDash.css'
import './Pay.css'

const Pay = () => {
    return (
        <>
            <div className='PayBackground'>
                <div className='PayCont'>
                    <div className="card-payment">
                        <div className="card-heading">
                            <h1>Pay for event mode</h1>
                        </div>
                        <div className="card-details">
                            <p>For online mode: 299</p>
                            <button
                                type="button"
                                // onClick={InitiateUserPayment}
                                value="Pay"
                                className="userDash__button"
                            //   onClick={() => InitiateUserPayment(299, true)}
                            >
                                Pay Now
                            </button>

                        </div>
                        <div className="card-details">
                            {/* {user && user.isPaid ? (
                "Paid"
              ) : ( */}
                            <p>For offline mode: 599</p>
                            {/* )}
              {user && user.isPaid ? (
                "Paid"
              ) : ( */}
                            <button
                                type="button"
                                // onClick={InitiateUserPayment}
                                value="Pay"
                                className="userDash__button"
                            //   onClick={() => InitiateUserPayment(599, false).call}
                            >
                                Pay Now
                            </button>
                            {/* )} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pay