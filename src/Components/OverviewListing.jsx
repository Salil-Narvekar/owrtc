import React, { useState } from 'react';
import Rating from './Rating';
import ButtonMain from './ButtonMain';
import Modal from 'react-modal'
import Loader from './Loader';
import { FaRegStar } from "react-icons/fa";


const OverviewListing = ({ listingContentArr, ratingRequired, ratingListArr, loggedRole }) => {

  const [releaseModal, setReleaseModal] = useState(false);
  const [releaseEmployeeName, setReleaseEmployeeName] = useState('');
  const [validateRating, setValidateRating] = useState(false);

  const [loader, setLoader] = useState(false);
  const [indexNo, setIndexNo] = useState('');

  const showLoading = (index) => {
    setLoader(true);
    setIndexNo(index);

    setTimeout(() => {
      setLoader(false);
      setIndexNo('');
    }, 1000);
  };

  // Set rating stars
  const [start1, setStart1] = useState(false);
  const [start2, setStart2] = useState(false);
  const [start3, setStart3] = useState(false);
  const [start4, setStart4] = useState(false);
  const [start5, setStart5] = useState(false);

  const releaseEmployee = () => {

    setValidateRating(true);

    if (start1 || start2 || start3 || start4 || start5) {
      setReleaseModal(false);
      setStart1(false);
      setStart2(false);
      setStart3(false);
      setStart4(false);
      setStart5(false);
      setLoader(false);
    }
  };

  const closeModal = () => {
    setReleaseModal(false);
    setStart1(false);
    setStart2(false);
    setStart3(false);
    setStart4(false);
    setStart5(false);
    setLoader(false);
  };

  if (!Array.isArray(listingContentArr)) {
    console.error('listingContentArr must be an array.');
    return null;
  }

  return (
    <div className='mt-4'>

      {
        loggedRole === "HR" ?

          <div className='grid grid-cols-4'>
            <div className='col-span-2 grid grid-rows-3 gap-3 text-left'>
              {
                listingContentArr.map((content, index) =>
                  <span className='self-center' key={index}>{content}</span>
                )
              }
            </div>

            <div className='col-span-1 grid grid-rows-3 gap-3 '>
              {
                ratingRequired &&
                ratingListArr.map((rating, index) =>
                  <div className='items-center'>
                    <Rating ratingValue={rating} />
                  </div>
                )
              }
            </div>
          </div>

          : loggedRole === "Project Manager" &&

          <div className='grid grid-cols-5'>
            <div className='col-span-2 grid grid-rows-3 gap-3 text-left'>
              {
                listingContentArr.map((content, index) =>
                  <span className='self-center' key={index}>{content}</span>
                )
              }
            </div>

            <div className='grid grid-rows-3 justify-items-center gap-3'>
              {
                ratingRequired &&
                ratingListArr.map((rating) =>

                  rating &&
                  <div className='items-center'>
                    <Rating ratingValue={rating} />
                  </div>
                )
              }
            </div>

            <div className='col-span-2 grid grid-rows-3 gap-3'>
              {
                listingContentArr.map(index =>

                  index &&

                  <div>
                    {
                      !loader ?
                        <ButtonMain
                          name="releaseEmployee"
                          buttonLable="Release"
                          size="small"
                          onClick={(e) => {
                            setReleaseModal(true);
                            setValidateRating(false);
                            setReleaseEmployeeName(index);
                            showLoading(index)
                          }}
                        />
                        : loader && indexNo !== index ?
                          <ButtonMain
                            name="releaseEmployee"
                            buttonLable="Release"
                            size="small"
                            onClick={(e) => {
                              setReleaseModal(true);
                              setValidateRating(false);
                              setReleaseEmployeeName(index);
                              showLoading(index)
                            }}
                          />
                          : indexNo === index && loader &&
                          <Loader />
                    }
                  </div>
                )
              }
            </div>
          </div>
      }

      {
        releaseModal && !loader &&
        <Modal
          isOpen={releaseModal}
          // onRequestClose={releaseModal}
          className="flex items-center justify-center h-screen bg-gray-950 bg-opacity-50"
        >
          <div className='grid sm:grid-rows-3 gap-1 rounded-2xl bg-white py-10 pl-20 pr-20'>

            <div className='grid items-center justify-items-center'>
              <div className='grid grid-cols-5 w-24 cursor-pointer bg-slate-100'>
                <FaRegStar
                  className={start1 ? 'rounded-3xl bg-yellow-500' : 'rounded-3xl hover:bg-yellow-500'}
                  onClick={() => {setStart1(true); setValidateRating(false)}}
                />

                <FaRegStar
                  className={start2 ? 'rounded-3xl bg-yellow-500' : 'rounded-3xl hover:bg-yellow-500'}
                  onClick={() => { setStart1(true); setStart2(true); setValidateRating(false) }}
                />

                <FaRegStar
                  className={start3 ? 'rounded-3xl bg-yellow-500' : 'rounded-3xl hover:bg-yellow-500'}
                  onClick={() => { setStart1(true); setStart2(true); setStart3(true); setValidateRating(false) }}
                />

                <FaRegStar
                  className={start4 ? 'rounded-3xl bg-yellow-500' : 'rounded-3xl hover:bg-yellow-500'}
                  onClick={() => { setStart1(true); setStart2(true); setStart3(true); setStart4(true); setValidateRating(false) }}
                />

                <FaRegStar
                  className={start5 ? 'rounded-3xl bg-yellow-500' : 'rounded-3xl hover:bg-yellow-500'}
                  onClick={() => { setStart1(true); setStart2(true); setStart3(true); setStart4(true); setStart5(true); setValidateRating(false) }}
                />

              </div>
            </div>

            <div className='grid justify-center -mt-1'>
              <span className='text-normal font-bold text-cyan-600'>Give Rating to {releaseEmployeeName}</span>
              <hr className='bg-slate-900' />
            </div>

            <div className='grid grid-cols-3 gap-2'>

              <div className='col-span-2'>
                <ButtonMain
                  name="rate_release"
                  buttonLable="Rate & Release"
                  onClick={() => releaseEmployee()}
                />
              </div>

              <button
                className='py-1 pl-1 pr-1 bg-gradient-to-r from-red-800 to-red-600 text-slate-300 text-sm 
                  transition duration-500 ease-in-out hover:scale-95 hover:bg-gradient-to-l hover:text-white 
                  cursor-pointer rounded-lg sm:w-full w-full font-semibold'
                onClick={() => closeModal()}
              > Close </button>
            </div>

            <div className='grid justify-center mt-2'>
              {
                validateRating &&
                <span className='text-xs text-orange-600 font-bold'> Rate employee to release !! </span>
              }
            </div>

          </div>
        </Modal>
      }
    </div>
  )
}

export default OverviewListing