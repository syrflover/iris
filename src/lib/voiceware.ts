import axios from 'axios';

/* import urllib.request

def get_file(message, id):
    url = 'http://www.voiceware.co.kr'
    param = 'contents=' + message + '&effect=0&speaker=13&music=&samesample=&dbsize=1'

    req = urllib.request.Request(url + "/tts/tts.exe")
    get_tts_link = urllib.request.urlopen(req, data=param.encode('utf-8'))
    tts_link = get_tts_link.read()

    get_tts_file = urllib.request.urlopen(url + tts_link.decode('utf-8') + "_bg$
    tts_wav = get_tts_file.read()
    with open(str(id) + ".wav", 'wb') as f:
        f.write(tts_wav)
    return 0 */

export interface IVoiceWareParams {
    speaker: number;
    dbsize: number;
}

export const voiceware = async (
    contents: string,
    params: IVoiceWareParams = { speaker: 13, dbsize: 1 },
) => {
    const { speaker, dbsize } = params;

    const voicewareUrl = 'http://www.voiceware.co.kr';
    const voicewareParams = `contents=${contents}&effect=0&speaker=${speaker}&music=&samesample=&dbsize=${dbsize}`;

    const voiceUrl = await axios
        .post(`${voicewareUrl}/tts/tts.exe`, voicewareParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((res) => res.data);

    return `${voicewareUrl}${voiceUrl}_bgm.wav`;

    //  return voiceFile;
};
