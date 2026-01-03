/**
 * Format price in New Zealand Dollars (NZD)
 * @param {number} price - Price value
 * @returns {string} Formatted price string
 */
export const formatNZD = (price) => {
    if (price === null || price === undefined) return 'N/A';

    return new Intl.NumberFormat('en-NZ', {
        style: 'currency',
        currency: 'NZD'
    }).format(price);
};

/**
 * Calculate discounted price
 * @param {number} price - Original price
 * @param {number} discount - Discount percentage
 * @returns {number} Discounted price
 */
export const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return price * (1 - discount / 100);
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleDateString('en-NZ', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Format date for input fields (YYYY-MM-DD)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
};

/**
 * Check if a special is currently active
 * @param {Object} special - Special object with startDate and endDate
 * @returns {boolean} True if active
 */
export const isSpecialActive = (special) => {
    const now = new Date();
    const start = new Date(special.startDate);
    const end = new Date(special.endDate);

    return special.status === 'active' && start <= now && end >= now;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

/**
 * Validate phone number (NZ format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
    const re = /^(\+?64|0)[2-9]\d{7,9}$/;
    return re.test(phone.replace(/\s/g, ''));
};
