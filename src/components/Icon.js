import * as React from "react";

const icons = {
  tableEmptyState: (
    <>
      <rect x="0.955335" y="1.04528" width="26.262" height="38.2842" rx="1" transform="matrix(0.997678 0.0449311 -0.0423425 1.00035 18.1754 14.7936)" fill="#EBEFF3" stroke="#D8E0E7" strokeWidth="2" />
      <path d="M4.49314 11.9757C2.85127 12.198 1.69079 13.7105 1.90114 15.354L6.5126 51.3835C6.72295 53.0269 8.22447 54.1789 9.86633 53.9566L33.877 50.7051C35.5189 50.4828 36.6793 48.9702 36.469 47.3268L31.8575 11.2973C31.6472 9.65388 30.1457 8.50184 28.5038 8.72418L4.49314 11.9757Z" fill="#FAFAFA" stroke="#D8E0E7" strokeWidth="2" />
      <path d="M2.89208 15.2204C2.75186 14.1248 3.52551 13.1164 4.62009 12.9682L28.6333 9.71609C29.7279 9.56786 30.7289 10.3359 30.8691 11.4315L31.7928 18.6485L3.81573 22.4374L2.89208 15.2204Z" fill="#D8E0E7" />
      <rect width="1.20991" height="3.92119" rx="0.604957" transform="matrix(0.126946 0.991909 -0.990953 0.134204 37.7646 10.4349)" fill="#C1C4D6" />
      <rect width="1.1761" height="4.03218" rx="0.588051" transform="matrix(0.990953 -0.134204 0.126945 0.991909 25.9961 2.71765)" fill="#C1C4D6" />
      <rect width="1.19331" height="3.97687" rx="0.596657" transform="matrix(0.781836 0.617475 -0.599921 0.804706 33.6362 4.31018)" fill="#C1C4D6" />
      <rect width="22.7435" height="1.61367" rx="0.806835" transform="matrix(0.990949 -0.134239 0.126913 0.991914 6.73779 23.6665)" fill="#D8E0E7" />
      <rect width="22.7435" height="1.61367" rx="0.806835" transform="matrix(0.990949 -0.134239 0.126913 0.991914 7.76123 31.6667)" fill="#D8E0E7" />
      <rect width="22.7435" height="1.61367" rx="0.806835" transform="matrix(0.990949 -0.134239 0.126913 0.991914 8.78467 39.6652)" fill="#D8E0E7" />
      <rect width="8.23459" height="1.61335" rx="0.806676" transform="matrix(0.990952 -0.134214 0.126936 0.99191 7.14551 26.8689)" fill="#EBEFF3" />
      <rect width="8.23459" height="1.61335" rx="0.806676" transform="matrix(0.990952 -0.134214 0.126936 0.99191 8.1709 34.8672)" fill="#EBEFF3" />
      <rect width="8.23459" height="1.61335" rx="0.806675" transform="matrix(0.990952 -0.134214 0.126936 0.99191 9.19287 42.8656)" fill="#EBEFF3" />
    </>
  ),
};

export default function Icon({ width = "22", height = "24", id, ...rest }) {
  return (
    <svg width={width} {...rest} height={height} fill="none" viewBox={`0 0 ${width} ${height}`}>
      {icons[id]}
    </svg>
  );
}
