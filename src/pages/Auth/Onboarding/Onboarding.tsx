import { IonContent, IonHeader, IonPage, IonTitle, useIonRouter, IonToolbar, IonFooter, IonButton, IonText, IonRow, IonCol, IonIcon, IonRouterContext, IonImg } from '@ionic/react';
import React, {useState, useRef, useContext} from 'react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import {arrowForward, arrowForwardCircleOutline} from 'ionicons/icons'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/controller';
import './Onboarding.css'

const Onboarding: React.FC = () => {
    const router = useIonRouter();
    // const swiper = useSwiper();
    const swiperRef: any = useRef();
    //LOCAL STATE
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <IonPage>
            {/* <IonHeader>
                <IonToolbar color={'light'}>
                    
                </IonToolbar>
            </IonHeader> */}
            <IonContent>
                {/* <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank App</IonTitle>
                    </IonToolbar>
                </IonHeader> */}
            <Swiper
                modules={[EffectCoverflow]}
                // spaceBetween={50}
                slidesPerView={1}
                onSlideChange={(e) => setActiveIndex(e.activeIndex)}
                onSwiper={(swiper) => { swiperRef.current = swiper; console.log(swiperRef)}}
                effect='coverflow'
                style={{backgroundColor: '#FEEFE5'}}
                >
                <SwiperSlide>
                    <div className='slides ion-text-center'>
                        <img src="/assets/img/slide1.jpg" alt="slide1" />
                        {/* <img src="../../../" alt="slide1" /> */}
                        <IonImg src='/assets/img/slide1.jpg'></IonImg>
                        <div className='ion-padding-horizontal'> 
                            <IonText className='ion-margin'>
                                <h2>Welcome Aboard Navigation Solution</h2> 
                            </IonText>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{backgroundColor: '#FEEFE5'}}>
                    <div className='slides ion-text-center'>
                        <img src="/assets/img/slide2.jpg" alt="slide2" />
                        <div className='ion-padding-horizontal'>
                            <IonText className='ion-margin'>
                                <h2>Experience Seamless Tracking</h2> 
                            </IonText>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='slides ion-text-center'>
                        <img src="/assets/img/slide3.jpg" alt="slide3" />
                        <IonText className='ion-margin ion-padding-horizontal'>
                            <h2>Efficient Use of Resources and Battery Saver</h2> 
                        </IonText>
                    </div>
                </SwiperSlide>
                </Swiper>
            </IonContent>
            <IonFooter className='ion-no-border'>
                <IonToolbar color={'light'}>
                    <IonRow className='ion-padding-horizontal ion-align-items-center'>
                        <IonCol>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '50px'}}>
                                <div style={activeIndex === 0 ? styles.active : styles.inactive} />
                                <div style={activeIndex === 1 ? styles.active : styles.inactive} />
                                <div style={activeIndex === 2 ? styles.active : styles.inactive} />
                            </div>
                        </IonCol>
                        <IonCol className='ion-text-right'>
                            {/* <IonText color={'tertiary'}>Next</IonText> */}
                            {/* <IonButton fill='outline' onClick={()=> swiper.slideNext()}> */}
                                <IonIcon onClick={()=> swiperRef.current?.slideNext()}
                                 icon={arrowForwardCircleOutline} color='danger' size='large' />
                            {/* </IonButton> */}
                        </IonCol>
                    </IonRow>
                    <IonButton expand='block' color={'primary'} className='ion-margin' 
                        onClick={()=>router.push('Login')}
                        // onClick={()=>ionRouterContext.push('Login')}
                    >
                        <IonText color={'light'}>Proceed</IonText>
                    </IonButton>
                </IonToolbar>
            </IonFooter>
            
        </IonPage>
    );
};

const styles = {
    active: {
        height: '10px',
        width: '25px',
        borderRadius: '3px',
        backgroundColor: '#00916E',
    },
    inactive: {
        height: '10px',
        width: '10px',
        borderRadius: '5px',
        backgroundColor: '#00916E',
    },
}

export default Onboarding;

