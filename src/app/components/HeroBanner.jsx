import React from 'react';
import NavDate from './navDate/NavDate';
import Image from 'next/image';

const HeroBanner = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto bg-white my-6 md:my-10 rounded-2xl p-6 md:p-10 gap-6 shadow-sm'>
            <div className='w-full md:w-3/5 text-left'>
                <NavDate className="bg-[#09612f] text-[#05893E] rounded-2xl mb-3 " />
                
                <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold text-black my-3 md:my-5 leading-snug'>
                    আজকের বাজারের দাম এক নজরে
                </h1>
                
                <p className='py-2 md:py-3 text-[#1D271F] text-sm sm:text-base leading-relaxed'>
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                </p>
                
                <button className='mt-3 bg-[#13c761] hover:bg-[#03662e] transition-colors text-white px-5 py-2.5 rounded-2xl text-sm sm:text-base font-medium w-full sm:w-auto'>
                    সব পণ্য দেখুন
                </button>
            </div>

            <div className='w-full md:w-2/5 flex justify-center items-center'>
                <div className='relative w-55 h-55 sm:w-70 sm:h-70 md:w-75 md:h-75'>
                    <Image 
                        src='/bazar-hero.png' 
                        alt='hero banner pic' 
                        fill
                        className='object-contain'
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;