import React from 'react';
import { Helmet } from 'react-helmet';
import { Users, Award, Coffee, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    return (
        <>
            <Helmet>
                <title>About Us - Oslo Sushi Gijón</title>
                <meta
                    name="description"
                    content="Learn about Oslo Sushi's journey, our expert chefs, and our commitment to authentic Japanese cuisine in Gijón."
                />
            </Helmet>

            {/* Main Content */}
            <section className="section-container py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900">{t('traditionMeetsInnovation')}</h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                {t('aboutP1')}
                            </p>
                            <p>
                                {t('aboutP2')}
                            </p>
                            <p>
                                {t('aboutP3')}
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1632&auto=format&fit=crop"
                            alt="Chef Preparing Sushi"
                            className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg hidden md:block">
                            <p className="text-4xl font-bold text-primary-600 mb-1">5+</p>
                            <p className="text-gray-600 font-medium">{t('yearsOfExcellence')}</p>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold mb-4">{t('ourCoreValues')}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {t('coreValuesSubtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{t('qualityFirst')}</h3>
                            <p className="text-gray-600 text-sm">
                                {t('qualityFirstDesc')}
                            </p>
                        </div>
                        <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{t('community')}</h3>
                            <p className="text-gray-600 text-sm">
                                {t('communityDesc')}
                            </p>
                        </div>
                        <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Coffee className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{t('craftsmanship')}</h3>
                            <p className="text-gray-600 text-sm">
                                {t('craftsmanshipDesc')}
                            </p>
                        </div>
                        <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="text-primary-600" size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{t('passion')}</h3>
                            <p className="text-gray-600 text-sm">
                                {t('passionDesc')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold mb-4">{t('meetOurChefs')}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {t('meetOurChefsSubtitle')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group relative overflow-hidden rounded-lg shadow-md">
                            <img
                                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1480&auto=format&fit=crop"
                                alt="Head Chef"
                                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                                <h3 className="text-xl font-bold">Kenji Tanaka</h3>
                                <p className="text-sm opacity-90">{t('executiveChef')}</p>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-md">
                            <img
                                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1554&auto=format&fit=crop"
                                alt="Sous Chef"
                                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                                <h3 className="text-xl font-bold">Maria Garcia</h3>
                                <p className="text-sm opacity-90">{t('sushiSpecialist')}</p>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg shadow-md">
                            <img
                                src="https://images.unsplash.com/photo-1572715376701-98568319fd0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D"
                                alt="Chef"
                                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                                <h3 className="text-xl font-bold">David Chen</h3>
                                <p className="text-sm opacity-90">{t('hotKitchenLead')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
