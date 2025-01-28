document.head.appendChild(document.createElement('style')).textContent = `html,body{height:100%;width:100%;display:flex;margin:0;}#webchat_content{height:100%;width:80%;max-width:calc(100% - 350px);}#webchat{height:100%;width:20%;min-width:450px;border:1px solid #CCC;border-top:0;border-bottom:0;}.webchat-close{position:absolute;top:6px;right:25px;padding:5px;border:2px solid rgb(204,204,204);border-radius:10px;color:rgb(245,247,250);font-size:13px;z-index:300;background-color:rgba(0,0,0,0.65);font-family:arial,sans-serif;cursor:pointer;}`.trim();
const currentUrl = window.location.href; 
const host = window.location.origin; 
const scriptElement = document.createElement('script');
scriptElement.src = currentUrl.replaceAll("uas.html", "webchat-full.js");
document.head.appendChild(scriptElement);

// Once the script is loaded, initialize the chat
scriptElement.onload = () => {
    initializeChat();
};
// Initialize the chat interface
function initializeChat() {
    // Define custom style options for the web chat
    const styleOptions = {
        paddingRegular: 10,
        paddingWide: 10 * 2,
        hideUploadButton: true,
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark background for the chat area
        sendBoxBackground: 'rgba(0, 0, 0, 0.85)', // Transparent input box
        sendBoxButtonShadeColorOnActive:'rgba(0, 0, 0, 0.85)', 
        sendBoxButtonShadeColorOnFocus:'rgba(0, 0, 0, 0.85)', 
        sendBoxButtonShadeColorOnHover:'rgba(0, 0, 0, 0.85)', 
        sendBoxButtonColor:'#fff',
        sendBoxButtonColorOnActive:'#ffffff78',
        sendBoxButtonColorOnFocus:'#ffffff78',
        sendBoxButtonColorOnHover:'#ffffff78',
        bubbleBackground: 'rgba(97, 110, 124, 0.32)', // Slightly transparent background for bubbles
        bubbleTextColor: '#F5F7FA', // Light color for text inside bubbles
        bubbleBorderWidth: 0,
        bubbleFromUserBorderWidth: 0,
        bubbleFromUserBackground: '#ccc', // Blue background for user bubbles
        bubbleFromUserTextColor: '#000', // White text in user bubbles
        sendBoxBorderTop: '1px solid #CCC', // Light gray border for the send box
        subtle: '#CBD2D9',
        sendBoxButtonColorOnFocus: '#FFFFFF',
        sendBoxButtonColorOnHover: '#FFFFFF',
        sendBoxTextColor: '#FFFFFF',
        paddingRegular: '14px', // Regular padding for most elements
        paddingWide: '18px', // Larger padding for input and send buttons
        sendBoxHeight: 60, // Adjusted input box height
        typingAnimationBackgroundImage: 'url(\'' + currentUrl.replaceAll("uas.html", "typing.gif") +'\')',
        typingAnimationWidth: 180,
        bubbleMinHeight: 15, // Taller bubbles for better legibility
        suggestedActionBackgroundColor: '#fff',
        suggestedActionBorderColor: '#616E7C',
        suggestedActionBorderStyle: 'solid',
        suggestedActionBorderWidth: 1,
        suggestedActionBorderRadius: 4, // Slightly rounded corners for suggested actions
        suggestedActionImageHeight: 20,
        suggestedActionTextColor: '#000',
        suggestedActionHeight: 50, // Taller suggested action buttons
        bubbleMaxWidth: 450 // Max width for bubbles
    };

    // Create a store for the web chat (optional)
    window.store = window.WebChat.createStore(
        {},
        ({ dispatch }) => next => action => {
            if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
                dispatch({
                    type: 'WEB_CHAT/SEND_EVENT',
                    payload: {
                        name: 'webchat/join',
                        value: { locale: 'en-en', host: location.protocol + '//' + location.hostname }
                    }
                });
            }
            if ((action.type === 'DIRECT_LINE/POST_ACTIVITY' || (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY' && action.payload.activity.from.role === 'bot')) && action.payload.activity.type === 'message') {
                let { text } = action.payload.activity;
                if (text?.startsWith('postCommand:')) {
                    try {
                        text = text.replace(/&gt;/g, '>');
                        text = text.replace(/&amp;/g, '&');
                        text = text.replace(/%7D/g, '}');
                        text = text.replace(/%7B/g, '{');
                        command_from_bot_to_page(text.substring('postCommand:'.length).trim());

                        return next;
                    } catch (error) {
                        console.error('Error executing function:', error);
                    }
                }
            }
            return next(action);
        }
    );


    let partToEncode;

    if (!partToEncode) {
        const pathMatch = currentUrl.match(/\/api\/([^\/]+)/); // Regex to capture after "/api/"
        if (pathMatch) {
            partToEncode = pathMatch[1]; // e.g., "botdominoe0"
        }
    }
    // Encode the extracted part in Base64
    const encodedPart = btoa("http://" + partToEncode);
    // Construct the new link
    const domain = `${host}/dl/directline/${encodedPart}`;
    // Render the web chat component
    window.WebChat.renderWebChat(
        {
            directLine: window.WebChat.createDirectLine({
                secret: '',
                token: '',
                domain: domain,
                webSocket: false
            }),
            locale: 'en',
            styleOptions,
            store: window.store

        },
        document.getElementById('webchat')
    );

    // Focus on the web chat component for user interaction
    document.querySelector('#webchat > *').focus();
}

function command_from_page_to_bot(message) {
    window.store.dispatch({
        type: 'WEB_CHAT/SEND_POST_BACK',
        payload: { value: "postBack:" + message }
    });
}
function clearChat() {
    window.store = null;
    initializeChat();
}


