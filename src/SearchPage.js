import { Description } from '@material-ui/icons';
import React from 'react'
import { Link } from 'react-router-dom';
import Search from './Search';
import './SearchPage.css'
import { useStateValue } from './StateProvider';
import useGoogleSearch from './useGoogleSearch';
import ImageIcon from '@material-ui/icons/Image';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RoomIcon from '@material-ui/icons/Room';
import SearchIcon from '@material-ui/icons/Search';
// import Response from './response';



function SearchPage() {

    
    const [ { term  }, dispatch] = useStateValue();

    // Live API CALL
    const { data } = useGoogleSearch(term);

    // const data = Response;


    console.log(data)
    return (
        <div className='searchPage'>
            <div className='searchPage__header'>
                <Link to="/">
                    <img className='searchPage_logo'
                        src='https://cdn.vox-cdn.com/thumbor/p01ezbiuDHgRFQ-htBCd7QxaYxo=/0x105:2012x1237/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg'
                        alt=''
                    />
                </Link>

                <div className='searchPage__headerBody'>
                    <Search hideButtons/>

                    <div className='searchPage__options'>
                        <div className='searchPage__optionsLeft'>
                            <div className='searchPage__option'>
                                <SearchIcon />
                                <Link to='/all'>All</Link>
                            </div>
                            <div className='searchPage__option'>
                                <Description />
                                <Link to='/new'>News</Link>
                            </div>
                            <div className='searchPage__option'>
                                <ImageIcon />
                                <Link to='/images'>Images</Link>
                            </div>
                            <div className='searchPage__option'>
                                <LocalOfferIcon />
                                <Link to='/shopping'>shopping</Link>
                            </div>
                            <div className='searchPage__option'>
                                <RoomIcon />
                                <Link to='/maps'>Maps</Link>
                            </div>
                            <div className='searchPage__option'>
                                <MoreVertIcon />
                                <Link to='/more'>More</Link>
                            </div>

                        </div>
                        <div className='searchPage__optionsRight'>
                            <div className='searchPage__option'>
                                <Link to='/settings'>Setting</Link>
                            </div>
                            <div className='searchPage__option'>
                                <Link to='/tools'>Tools</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            { term && (
                <div className='searchPage__results'>
                    <p className='searchPage__resultCount'>
                        About {data?.searchInformation.formattedTotalResults} results ( {data?.searchInformation.formattedSearchTime} seconds) for {term}
                    </p>

                    {data?.items.map(item => (
                        <div className='searchPage__result'>
                            <a href={item.link}>
                                {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (
                                    <img className='searchPage__resultImage' src={item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src} alt=''/>
                                )} 

                                {item.displayLink}
                            </a>

                            <a className='searchPage__resultTitle' href={item.link}>
                                <h2>{item.title}</h2>
                            </a>
                            <p className='searchPage__resultSnippet'>{item.snippet}</p>
                        </div>
                    ))}
                </div>  
            )}
          
        </div>
    )
}

export default SearchPage


// 125fad8291900f8e6

// https://developers.google.com/custom-search/v1/introduction#identify_your_application_to_google_with_api_key
// https://cse.google.com/cse/setup/basic?cx=125fad8291900f8e6