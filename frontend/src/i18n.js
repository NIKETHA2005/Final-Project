import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: 'Welcome to OCR Scanner',
      preparePassbook: 'Please prepare your passbook for scanning.',
      startScan: 'Start Scan',

      name: 'Name',
      accountNumber: 'Account Number',
      ifscCode: 'IFSC Code',
      depositPageTitle: 'Deposit Page',
      userLabel: 'User:',
      accountNumberLabel: 'Account Number:',
      currencyDenominationHeader: 'Enter Currency Denominations',
      totalAmountLabel: 'Total Amount:',
      nextButton: 'Next',

      userDetails: 'User Details',
      branch: 'Branch',
      unknown: 'Unknown',
      deposit: 'Deposit',
      withdrawal: 'Withdrawal',

      withdrawalPageTitle: 'Withdrawal',
      accountHolder: 'Name:',
      accountBalance: 'Account Balance:',
      enterWithdrawalAmount: 'Enter Withdrawal Amount:',
      enterValidAmount: 'Please enter a valid amount.',
      insufficientBalance: 'Insufficient balance. Please enter a lower amount.',
      nextButton: 'Next',
      unknown: 'Unknown',
      zeroBalance: '0',

      authenticationPageTitle: 'Authentication Page',
      userLabel: 'Name:',
      transactionType:'Transaction Type:',
      accountNumberLabel: 'Account Number:',
      totalAmountLabel: 'Total Amount:',
      selectAuthMethod: 'Select Authentication Method',
      enterMethod: 'Enter {{method}}',
      simulateBiometric: 'Simulating Biometric...',
      pinPlaceholder: 'Enter PIN',
      otpPlaceholder: 'Enter OTP',
      authenticateButton: 'Authenticate',
      invalidPin: 'Invalid PIN. Please try again.',
      invalidOtp: 'Invalid OTP. Please try again.',
      selectMethodError: 'Please select an authentication method.',
      unknown: 'Unknown',
      zeroAmount: '0',
    },
  },
  ta: {
    translation: {
      welcome: 'ஓசிஆர் ஸ்கேனர் வரவேற்கிறது',
      preparePassbook: 'உங்கள் பாஸ்புக் தயாராக வைத்திருக்கவும்.',
      startScan: 'ஸ்கேன் தொடங்கு',

      name: 'பெயர்',
      accountNumber: 'கணக்கு எண்',
      ifscCode: 'IFSC குறியீடு',
      depositPageTitle: 'வைப்பு பக்கம்',
      userLabel: 'பயனர்:',
      accountNumberLabel: 'கணக்கு எண்:',
      currencyDenominationHeader: 'நாணய மதிப்புகளை உள்ளிடவும்',
      totalAmountLabel: 'மொத்த தொகை:',
      nextButton: 'அடுத்தது',

      userDetails: 'பயனர் விவரங்கள்',
      unknown: 'தெரியவில்லை',
      branch: 'கிளை',
      deposit: 'வைப்பு',
      withdrawal: 'திரும்பப்பெறல்',

      withdrawalPageTitle: 'திரும்பப்பெறல்',
      accountHolder: 'கணக்கு வைத்திருப்பவர்:',
      accountBalance: 'கணக்கு இருப்பு:',
      enterWithdrawalAmount: 'திரும்பப்பெறல் தொகையை உள்ளிடவும்:',
      enterValidAmount: 'செல்லுபடியாகும் தொகையை உள்ளிடவும்.',
      insufficientBalance: 'போதிய இருப்பு இல்லை. குறைந்த தொகையை உள்ளிடவும்.',
      nextButton: 'அடுத்தது',
      unknown: 'தெரியவில்லை',
      zeroBalance: '0',

      authenticationPageTitle: 'அங்கீகார பக்கம்',
      userLabel: 'பயனர்:',
      transactionType: 'பரிவர்த்தனை வகை:',
      accountNumberLabel: 'கணக்கு எண்:',
      totalAmountLabel: 'மொத்த தொகை:',
      selectAuthMethod: 'அங்கீகார முறையைத் தேர்ந்தெடுக்கவும்',
      enterMethod: '{{method}} உள்ளிடவும்',
      simulateBiometric: 'உடற்கூறு நகலெடுக்கிறது...',
      pinPlaceholder: 'பின்அல்லது பதிவை உள்ளிடவும்',
      otpPlaceholder: 'OTP உள்ளிடவும்',
      authenticateButton: 'அங்கீகரிக்கவும்',
      invalidPin: 'தவறான PIN. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
      invalidOtp: 'தவறான OTP. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
      selectMethodError: 'தயவுசெய்து அங்கீகார முறையைத் தேர்ந்தெடுக்கவும்.',
      unknown: 'தெரியவில்லை',
      zeroAmount: '0',
    },
  },
  hi: {
    translation: {
      welcome: 'ओसीआर स्कैनर में आपका स्वागत है',
      preparePassbook: 'कृपया अपना पासबुक तैयार रखें।',
      startScan: 'स्कैन प्रारंभ करें',

      name: 'नाम',
      accountNumber: 'खाता संख्या',
      ifscCode: 'आईएफएससी कोड',
      depositPageTitle: 'जमा पृष्ठ',
      userLabel: 'उपयोगकर्ता:',
      accountNumberLabel: 'खाता संख्या:',
      currencyDenominationHeader: 'मुद्रा मूल्य दर्ज करें',
      totalAmountLabel: 'कुल राशि:',
      nextButton: 'अगला',

      userDetails: 'उपयोगकर्ता विवरण',
      branch: 'शाखा',
      unknown: 'अज्ञात',
      deposit: 'जमा करें',
      withdrawal: 'निकासी',

      withdrawalPageTitle: 'निकासी',
      accountHolder: 'खाता धारक:',
      accountBalance: 'खाता शेष:',
      enterWithdrawalAmount: 'निकासी राशि दर्ज करें:',
      enterValidAmount: 'कृपया एक मान्य राशि दर्ज करें।',
      insufficientBalance: 'पर्याप्त शेष नहीं है। कृपया एक छोटी राशि दर्ज करें।',
      nextButton: 'अगला',
      unknown: 'अज्ञात',
      zeroBalance: '0',

      authenticationPageTitle: 'प्रमाणीकरण पृष्ठ',
      transactionType: 'लेन-देन प्रकार:',
      userLabel: 'उपयोगकर्ता:',
      accountNumberLabel: 'खाता संख्या:',
      totalAmountLabel: 'कुल राशि:',
      selectAuthMethod: 'प्रमाणीकरण विधि चुनें',
      enterMethod: '{{method}} दर्ज करें',
      simulateBiometric: 'बायोमेट्रिक का अनुकरण...',
      pinPlaceholder: 'पिन दर्ज करें',
      otpPlaceholder: 'ओटीपी दर्ज करें',
      authenticateButton: 'प्रमाणित करें',
      invalidPin: 'अमान्य पिन। कृपया पुनः प्रयास करें।',
      invalidOtp: 'अमान्य ओटीपी। कृपया पुनः प्रयास करें।',
      selectMethodError: 'कृपया प्रमाणीकरण विधि चुनें।',
      unknown: 'अज्ञात',
      zeroAmount: '0',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false, // React already handles escaping
  },
});

export default i18n;
