import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <>
            {/* JSON-LD Structured Data for Local Business SEO */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Restaurant',
                        name: 'Restaurante Japonés Oslo Sushi',
                        image: 'https://yourdomain.com/restaurant-image.jpg',
                        '@id': 'https://esrest.es',
                        url: 'https://esrest.es',
                        telephone: '+34 672 59 96 63',
                        priceRange: '€20–30',
                        address: {
                            '@type': 'PostalAddress',
                            streetAddress: 'C. Evaristo Valle, 4',
                            addressLocality: 'Gijón',
                            addressRegion: 'Asturias',
                            postalCode: '33202',
                            addressCountry: 'ES'
                        },
                        geo: {
                            '@type': 'GeoCoordinates',
                            latitude: 43.5398,
                            longitude: -5.6554
                        },
                        openingHoursSpecification: [
                            {
                                '@type': 'OpeningHoursSpecification',
                                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                                opens: '20:00',
                                closes: '23:30'
                            }
                        ],
                        servesCuisine: 'Japanese',
                        acceptsReservations: 'True'
                    })}
                </script>
            </Helmet>

            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* About Section */}
                        <div>
                            <h3 className="text-xl font-serif font-bold mb-4">Oslo Sushi</h3>
                            <p className="text-gray-400 mb-4">
                                {t('osloSushiDescription')}
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">{t('contactUs')}</h4>
                            <div className="space-y-3 text-gray-400">
                                <div className="flex items-start space-x-3">
                                    <MapPin size={20} className="text-primary-400 flex-shrink-0 mt-1" />
                                    <span>C. Evaristo Valle, 4<br />33202 Gijón, Asturias, Spain</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone size={20} className="text-primary-400 flex-shrink-0" />
                                    <span>+34 672 59 96 63</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail size={20} className="text-primary-400 flex-shrink-0" />
                                    <span>info@esrest.es</span>
                                </div>
                            </div>
                        </div>

                        {/* Opening Hours & Social */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">{t('openingHours')}</h4>
                            <div className="text-gray-400 space-y-2 mb-6">
                                <p><strong>{t('everyDay')}</strong> {t('opensAt')}</p>
                                <p><strong>{t('deliveryTakeout')}</strong> {t('available')}</p>
                            </div>

                            <div className="flex space-x-4">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary-400 transition-colors"
                                    aria-label="Facebook"
                                >
                                    <Facebook size={24} />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary-400 transition-colors"
                                    aria-label="Instagram"
                                >
                                    <Instagram size={24} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-8 pt-8 border-t border-gray-800">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-gray-400 text-sm">
                                © {currentYear} {t('rightsReserved')}
                            </p>
                            <div className="flex space-x-6 text-sm text-gray-400">
                                <Link to="/menu" className="hover:text-primary-400 transition-colors">
                                    {t('menu')}
                                </Link>
                                <Link to="/booking" className="hover:text-primary-400 transition-colors">
                                    {t('reservations')}
                                </Link>
                                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                                    {t('contact')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
