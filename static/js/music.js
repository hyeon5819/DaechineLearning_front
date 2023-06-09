token = localStorage.getItem("access")
async function music_search() {
    const query = document.querySelector("#query").value
    let limit = document.querySelector("#limit").value
    if (query === '') {
        alert("검색어를 입력해주세요.")
        return
    }

    if (!limit || limit === '') {
        limit = 10
    } else if (isNaN(parseInt(limit))) {
        alert("검색 개수는 숫자를 입력해주세요.")
        return
    }

    const formdata = new FormData()

    formdata.append('query', query)
    formdata.append('limit', limit)

    const response = await fetch(`https://test53jm.com/articles/music/api/search`, {
        method: "POST",
        body: formdata
    })
    const data = await response.json()


    let resultEl = document.querySelector('#result')
    let h2_add = document.querySelector('#add_h2')
    tracks = data['tracks']
    tracks = await Promise.all(tracks.map(async track => {
        const previewUrl = await preview_music(track);
        return {
            ...track,
            preview_url: previewUrl
        }
    }))
    let trackHtml = ``
    for (let i = 0; i < tracks.length; i++) {
        track = tracks[i]
        let images = track['album']['images']
        let imageUrl = ''
        if (images && images.length > 0) {
            imageUrl = images[0]['url']
        }
        trackHtml += `
        <div class="track-container">
            <div class="col">
                <div class="card h-100">
                    <img src="${imageUrl}" height="300" width="300" class="card-img-top">
                <div class="card-body">
                    <h2 class="card-title">${i + 1}. ${track.name}</h2>
                    <p class="card-text">Artist: ${track.artist} / Album: ${track.album.name}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <small class="text-body-secondary fs-5">발매일 : ${track.album.release_date}</small>
                    <button onclick="save_db(tracks[${i}])" type="button" class="btn btn-primary" >저장</button>
                </div>
                    <div class="audio">
                        <audio style="width:100%;" controls="" name="media" class="mt-4 mb-4 ps-3 pe-3">
                        <source src="${track.preview_url}" type="audio/mpeg">
                        </audio>
                    </div>
                </div>
            </div>
        </div>`
    }

    h2_add.innerHTML = `<h2>Tracks (${tracks.length})</h2>`
    resultEl.innerHTML = trackHtml
}
// 미리듣기url 가져오는 함수
async function preview_music(track) {
    let response = await fetch('https://test53jm.com/articles/music/api/music-id-search', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            music_id: track.id
        })
    });
    let data = await response.json();
    return data.preview_url;
}

async function save_db(track) {
    const imageUrl = track.album.images[1].url;
    const formdata = new FormData()
    const user = JSON.parse(localStorage.getItem("payload")).user_id
    formdata.append('user', user)
    formdata.append('images', imageUrl)
    formdata.append('name', track.name)
    formdata.append('artist', track.artist)
    formdata.append('album', track.album.name)
    formdata.append('music_id', track.album.id)
    const response = await fetch(`https://test53jm.com/articles/save_music`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,

        },
        body: formdata,
    })
    const data = await response.json()

    alert('데이터베이스 저장성공!')
    window.opener.document.getElementById('music').value = data.id
    window.opener.document.getElementById('image').src = data.images
    window.opener.document.getElementById('image').name = data.images
    window.close();

    
}

//녹음
//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;
recordStatus = true
var gumStream;              //stream from getUserMedia()
var rec;                    //Recorder.js object
var input;                  //MediaStreamAudioSourceNode we'll be recording
// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //new audio context to help us record
//add events to those 2 buttons

async function record() {
    if (recordStatus) {
        recordStatus = false
        startRecording()
    } else {
        recordStatus = true
        stopRecording()
    }
}
function startRecording() {
    // Disable the record button until we get a success or fail from getUserMedia()
    recordButton.disabled = false;

    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function (stream) {
        audioContext = new AudioContext({ sampleRate: 16000 });

        // assign to gumStream for later use
        gumStream = stream;

        // use the stream
        input = audioContext.createMediaStreamSource(stream);

        // Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size
        rec = new Recorder(input, { numChannels: 1 })

        //start the recording process
        rec.record()

    }).catch(function (err) {
        //enable the record button if getUserMedia() fails
        recordButton.disabled = false;
    });
}

function stopRecording() {
    //disable the stop button, enable the record too allow for new recordings
    recordButton.disabled = false;

    //tell the recorder to stop the recording
    rec.stop(); //stop microphone access
    gumStream.getAudioTracks()[0].stop();

    //create the wav blob and pass it on to createDownloadLink
    rec.exportWAV(createDownloadLink);
}

async function createDownloadLink(blob) {
    //blob
    let token = localStorage.getItem("access")
    const formdata = new FormData();
    formdata.append("blob", blob)
    const response = await fetch(`https://test53jm.com/sound/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formdata
    })
    const data = await response.json()

    //음성인식값 넣기
    document.getElementById("query").value = data["message"]
}

window.onload = () => {
    let close = true
    let jk_record = document.querySelector("#recordButton")
    let jk_close = document.querySelector("#closeButton")

    jk_close.style.display = "none"
    jk_record.addEventListener('click', function () {
        if (close = true) {
            jk_record.style.display = "none"
            jk_close.style.display = "inline"
            close = false
        }
    })
    jk_close.addEventListener('click', function () {
        if (close = true) {
            jk_close.style.display = "none"
            jk_record.style.display = "inline"
            close = false
        }
    })
}
