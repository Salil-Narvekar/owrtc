import React from 'react'
import ButtonMain from './ButtonMain'
import OverviewContent from './OverviewContent'

const OverviewPlate = ({ 
    overviewTitle, 
    buttonRequired, 
    buttonName1, 
    buttonLable1,
    onClickButton1,
    buttonName2, 
    buttonLable2, 
    onClickButton2,
    listTitle1, 
    listTitle2, 
    listTitle3, 
    listingContentArr1,
    listingContentArr2,
    listingContentArr3,
    ratingRequired,
    ratingListArr1,
    ratingListArr2,
    ratingListArr3,
    loggedRole
  }) => {

  return (
    <div>

      {
        buttonRequired ?
          <div className='rounded-lg bg-slate-300 py-1 grid grid-cols-2 gap-4'>
            <span className='text-xl font-bold sm:text-right'>{overviewTitle}</span>

            <div className='grid sm:grid-cols-4 justify-content-start gap-2'>
              <ButtonMain 
                name={buttonName1} 
                buttonLable={buttonLable1} 
                size="small"
                onClick={onClickButton1}
              />

              <ButtonMain 
                name={buttonName2} 
                buttonLable={buttonLable2} 
                size="small"
                onClick={onClickButton2}
              />

            </div>
          </div>

          :

          <div className='rounded-lg bg-slate-300 py-1'>
            <span className='text-xl font-bold'>{overviewTitle}</span>
          </div>

      }

      <OverviewContent 
        listTitle1={listTitle1} 
        listTitle2={listTitle2} 
        listTitle3={listTitle3} 

        listingContentArr1={listingContentArr1}
        listingContentArr2={listingContentArr2}
        listingContentArr3={listingContentArr3}

        ratingRequired={ratingRequired}
        ratingListArr1={ratingListArr1}
        ratingListArr2={ratingListArr2}
        ratingListArr3={ratingListArr3}

        loggedRole={loggedRole}
      />


    </div>
  )
}

export default OverviewPlate