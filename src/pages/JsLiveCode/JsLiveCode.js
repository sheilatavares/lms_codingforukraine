import React from 'react';

function JsLiveCode() {
  return (
    <div className="bg-white p-md-4">
      <iframe
        src="https://sheilatavares.github.io/js-playground/dist/index.html"
        style={{
          display: 'block',
          width: '100%',
          height: '60vh',
          border: '0',
          overflow: 'hidden',
        }}
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
      ></iframe>
    </div>
  );
}

export default JsLiveCode;
