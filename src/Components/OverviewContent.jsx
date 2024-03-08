import React from 'react'
import OverviewListing from './OverviewListing'

const OverviewContent = ({ listTitle1, listTitle2, listTitle3, listingContentArr1, listingContentArr2, listingContentArr3, ratingRequired, ratingListArr1, ratingListArr2, ratingListArr3, loggedRole }) => {
    return (
        <div className='grid sm:grid-cols-3 gap-4 mt-5 mb-16 font-semibold'>

            <div>
                <span className='text-orange-500'>{listTitle1}</span> <br/>
                <hr className='border-t-2 border-orange-500 mt-1' />
                <OverviewListing 
                    listingContentArr={listingContentArr1} 
                    ratingRequired={ratingRequired} 
                    ratingListArr={ratingListArr1} 
                    loggedRole={loggedRole}
                />
            </div>

            <div>
                <span className='text-violet-900'>{listTitle2}</span> <br/> 
                <hr className='border-t-2 border-violet-900 mt-1' />
                <OverviewListing 
                    listingContentArr={listingContentArr2} 
                    ratingRequired={ratingRequired} 
                    ratingListArr={ratingListArr2} 
                    loggedRole={loggedRole}
                />
            </div>
    
            <div>
                <span className='text-orange-800'>{listTitle3}</span> <br/> 
                <hr className='border-t-2 border-orange-800 mt-1' />
                <OverviewListing 
                    listingContentArr={listingContentArr3}
                    ratingRequired={ratingRequired} 
                    ratingListArr={ratingListArr3} 
                    loggedRole={loggedRole}
                />
            </div>

        </div>
    )
}

export default OverviewContent