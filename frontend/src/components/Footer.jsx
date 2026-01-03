import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            {/* JSON-LD Structured Data for Local Business SEO */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Restaurant',
                        name: 'Star and Garter Oamaru',
                        image: 'https://yourdomain.com/restaurant-image.jpg',
                        '@id': 'https://yourdomain.com',
                        url: 'https://yourdomain.com',
                        telephone: '+64-3-434-xxxx',
                        priceRange: '$20-$40',
                        address: {
                            '@type': 'PostalAddress',
                            streetAddress: 'Ground Floor/9 Itchen Street',
                            addressLocality: 'Oamaru',
                            postalCode: '9400',
                            addressCountry: 'NZ'
                        },
                        geo: {
                            '@type': 'GeoCoordinates',
                            latitude: -45.0976,
                            longitude: 170.9703
                        },
                        openingHoursSpecification: [
                            {
                                '@type': 'OpeningHoursSpecification',
                                dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'],
                                opens: '17:30',
                                closes: '21:00'
                            },
                            {
                                '@type': 'OpeningHoursSpecification',
                                dayOfWeek: ['Friday', 'Saturday'],
                                opens: '17:30',
                                closes: '22:00'
                            }
                        ],
                        servesCuisine: 'Fine Dining',
                        acceptsReservations: 'True'
                    })}
                </script>
            </Helmet>

            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* About Section */}
                        <div>
                            <h3 className="text-xl font-serif font-bold mb-4">Star & Garter</h3>
                            <p className="text-gray-400 mb-4">
                                Fine dining in the heart of Oamaru, New Zealand. Experience exquisite cuisine
                                crafted with local ingredients.
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                            <div className="space-y-3 text-gray-400">
                                <div className="flex items-start space-x-3">
                                    <MapPin size={20} className="text-primary-400 flex-shrink-0 mt-1" />
                                    <span>Ground Floor/9 Itchen Street<br />Oamaru 9400, New Zealand</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone size={20} className="text-primary-400 flex-shrink-0" />
                                    <span>+64 3 434 xxxx</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail size={20} className="text-primary-400 flex-shrink-0" />
                                    <span>info@starandgarter.co.nz</span>
                                </div>
                            </div>
                        </div>

                        {/* Opening Hours & Social */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
                            <div className="text-gray-400 space-y-2 mb-6">
                                <p><strong>Tue - Thu:</strong> 5:30 PM - 9:00 PM</p>
                                <p><strong>Fri - Sat:</strong> 5:30 PM - 10:00 PM</p>
                                <p><strong>Sun - Mon:</strong> Closed</p>
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
                                © {currentYear} Star and Garter Oamaru. All rights reserved.
                            </p>
                            <div className="flex space-x-6 text-sm text-gray-400">
                                <Link to="/menu" className="hover:text-primary-400 transition-colors">
                                    Menu
                                </Link>
                                <Link to="/booking" className="hover:text-primary-400 transition-colors">
                                    Reservations
                                </Link>
                                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                                    Contact
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
