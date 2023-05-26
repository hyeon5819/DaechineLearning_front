// 게시글 id
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("article_id");

// access토큰 user id
if (localStorage.getItem("access")) {
    const access = localStorage.getItem("access");
    const userId = JSON.parse(localStorage.getItem("payload")).user_id
}

// 이모티콘 보이기/숨기기
function emoticonToggle(emoticon_popup) {
    const emoticonPopup = document.getElementById(emoticon_popup.id)

    if (emoticonPopup.style.display == 'none') {
        emoticonPopup.setAttribute('style', 'position: relative; z-index: 1; margin-top: -17px; display: block;')
    } else if (emoticonPopup.style.display == 'block') {
        emoticonPopup.setAttribute('style', 'position: relative; z-index: 1; margin-top: -17px; display: none;')
    }
}

// 댓글 불러오기
async function getComment(articleId) {
    const response = await fetch(`${back_base_url}/comments/${articleId}/comment/`);

    if (response.status == 200) {
        response_json = await response.json();
        return response_json;
    } else {
        alert(response.status);
    }
}

// 유저가 가진 이모티콘들 가져오기
async function getUserEmoticon(userId) {
    const access = localStorage.getItem("access");

    const response = await fetch(`${back_base_url}/comments/emoticon/${userId}`, {
        headers: {
            Authorization: `Bearer ${access}`,
        },
        method: "GET",
    });

    if (response.status == 200) {
        response_json = await response.json();
        return response_json;
    } else {
        alert(response.status);
    }
}

// 기본 이모티콘 가져오기
async function getBaseEmoticon(userId) {
    const access = localStorage.getItem("access");

    const response = await fetch(`${back_base_url}/comments/emoticon/${userId}/base/`, {
        headers: {
            Authorization: `Bearer ${access}`,
        },
        method: "GET",
    });

    if (response.status == 200) {
        response_json = await response.json();
        return response_json;
    } else {
        alert(response.status);
    }
}

// 이모티콘 버튼에 리스트 만들기
async function emoticonButtonList(user_emoticon_list, emoticon_popup, emoticonbtn, emoticon_images, use_emoticon) {
    const emoticonPopup = document.getElementById(emoticon_popup)
    // 유저가 가진 이모티콘 가져오기
    if (localStorage.getItem("access")) {
        const userId = JSON.parse(localStorage.getItem("payload")).user_id

        // 기본 이모티콘
        const response_baseemoticon = await getBaseEmoticon(userId);
        const userBaseEmoticon = document.getElementById(user_emoticon_list)

        const baseEmoticon = document.createElement('li')
        baseEmoticon.setAttribute('class', 'nav-item')
        userBaseEmoticon.appendChild(baseEmoticon)

        const userBaseEmoticonButton = document.createElement('button')
        userBaseEmoticonButton.setAttribute('style', 'border: none;')

        userBaseEmoticonButton.addEventListener('click', function () {
            const baseEmoticonImages = document.getElementById(emoticon_images)

            while (baseEmoticonImages.firstChild) {
                baseEmoticonImages.firstChild.remove();
            }
            response_baseemoticon.images.forEach(image => {
                const baseEmoticonImage = document.createElement('img')
                baseEmoticonImage.setAttribute('src', `${back_base_url}${image.image}`)
                baseEmoticonImage.setAttribute('style', 'height: 110px')

                const image_input_box_ = document.getElementById(use_emoticon)
                baseEmoticonImage.addEventListener('click', function () {
                    if (!image_input_box_.alt == 'none') {
                        image_input_box_.removeAttribute('src')
                        image_input_box_.removeAttribute('alt')

                        image_input_box_.setAttribute('src', `${back_base_url}${image.image}`)
                        image_input_box_.setAttribute('style', 'width: 50px; margin: auto;')
                        image_input_box_.setAttribute('id', use_emoticon)
                        image_input_box_.setAttribute('alt', `${image.id}`)
                        image_input_box_.addEventListener('click', function () {
                            image_input_box_.removeAttribute('src')
                            image_input_box_.removeAttribute('alt')
                        })
                    } else {
                        image_input_box_.setAttribute('src', `${back_base_url}${image.image}`)
                        image_input_box_.setAttribute('style', 'width: 50px; margin: auto;')
                        image_input_box_.setAttribute('id', use_emoticon)
                        image_input_box_.setAttribute('alt', `${image.id}`)
                        image_input_box_.addEventListener('click', function () {
                            image_input_box_.removeAttribute('src')
                            image_input_box_.removeAttribute('alt')
                        })
                    }
                    emoticonToggle(emoticonPopup)
                })

                baseEmoticonImages.appendChild(baseEmoticonImage)
            });
        });

        baseEmoticon.appendChild(userBaseEmoticonButton)

        const userBaseEmoticonButtonSpan = document.createElement('span')
        userBaseEmoticonButtonSpan.innerText = response_baseemoticon.title
        userBaseEmoticonButton.appendChild(userBaseEmoticonButtonSpan)


        const baseEmoticonImages = document.getElementById(emoticon_images)

        while (baseEmoticonImages.firstChild) {
            baseEmoticonImages.firstChild.remove();
        }
        response_baseemoticon.images.forEach(image => {
            const baseEmoticonImage = document.createElement('img')
            baseEmoticonImage.setAttribute('src', `${back_base_url}${image.image}`)
            baseEmoticonImage.setAttribute('style', 'height: 110px')

            const image_input_box_ = document.getElementById(use_emoticon)
            baseEmoticonImage.addEventListener('click', function () {
                if (!image_input_box_.alt == 'none') {
                    image_input_box_.removeAttribute('src')
                    image_input_box_.removeAttribute('alt')

                    image_input_box_.setAttribute('src', `${back_base_url}${image.image}`)
                    image_input_box_.setAttribute('style', 'width: 50px; margin: auto;')
                    image_input_box_.setAttribute('id', use_emoticon)
                    image_input_box_.setAttribute('alt', `${image.id}`)
                    image_input_box_.addEventListener('click', function () {
                        image_input_box_.removeAttribute('src')
                        image_input_box_.removeAttribute('alt')
                    })
                } else {
                    image_input_box_.setAttribute('src', `${back_base_url}${image.image}`)
                    image_input_box_.setAttribute('style', 'width: 50px; margin: auto;')
                    image_input_box_.setAttribute('id', use_emoticon)
                    image_input_box_.setAttribute('alt', `${image.id}`)
                    image_input_box_.addEventListener('click', function () {
                        image_input_box_.removeAttribute('src')
                        image_input_box_.removeAttribute('alt')
                    })
                }
                emoticonToggle(emoticonPopup)
            })

            baseEmoticonImages.appendChild(baseEmoticonImage)
        });

        // 유저가 가진 이모티콘 리스트 추가
        const response_useremoticon = await getUserEmoticon(userId);
        const userEmoticonList = document.getElementById(user_emoticon_list)
        response_useremoticon.forEach(user_emoticon => {
            const userEmoticon = document.createElement('li')
            userEmoticon.setAttribute('class', 'nav-item')
            userEmoticonList.appendChild(userEmoticon)

            const userEmoticonButton = document.createElement('button')
            userEmoticonButton.setAttribute('style', 'border: none;')

            userEmoticonButton.addEventListener('click', function () {
                const emoticonImages = document.getElementById(emoticon_images)

                while (emoticonImages.firstChild) {
                    emoticonImages.firstChild.remove();
                }
                user_emoticon.images.forEach(image => {
                    const emoticonImage = document.createElement('img')
                    emoticonImage.setAttribute('src', `${back_base_url}${image.image}`)
                    emoticonImage.setAttribute('style', 'height: 110px')
                    // 이모티콘 클릭했을때 입력창에 넣어주기
                    const image_input_box = document.getElementById(use_emoticon)
                    emoticonImage.addEventListener('click', function () {
                        if (!image_input_box.alt == 'none') {
                            image_input_box.removeAttribute('src')
                            image_input_box.removeAttribute('alt')

                            image_input_box.setAttribute('src', `${back_base_url}${image.image}`)
                            image_input_box.setAttribute('style', 'width: 50px; margin: auto;')
                            image_input_box.setAttribute('id', use_emoticon)
                            image_input_box.setAttribute('alt', `${image.id}`)
                            image_input_box.addEventListener('click', function () {
                                image_input_box.removeAttribute('src')
                                image_input_box.removeAttribute('alt')
                            })
                        } else {
                            image_input_box.setAttribute('src', `${back_base_url}${image.image}`)
                            image_input_box.setAttribute('style', 'width: 50px; margin: auto;')
                            image_input_box.setAttribute('id', use_emoticon)
                            image_input_box.setAttribute('alt', `${image.id}`)
                            image_input_box.addEventListener('click', function () {
                                image_input_box.removeAttribute('src')
                                image_input_box.removeAttribute('alt')
                            })
                        }
                        emoticonToggle(emoticonPopup)
                    })
                    emoticonImages.appendChild(emoticonImage)
                });
            });

            userEmoticon.appendChild(userEmoticonButton)

            const userEmoticonButtonSpan = document.createElement('span')
            userEmoticonButtonSpan.innerText = user_emoticon.title
            userEmoticonButton.appendChild(userEmoticonButtonSpan)
        });
    }
    emoticonPopup.style.display = 'block'
    const emotiBtn = document.getElementById(emoticonbtn)
    emotiBtn.setAttribute('onclick', `emoticonToggle(${emoticonPopup.id})`)
}

// 댓글 등록
async function commentCreate(article_id) {
    if (localStorage.getItem("access")) {
        const commentContent = document.getElementById("comment_content").value;
        const commentEmoticon = document.getElementById("use_emoticon").alt;

        if (commentContent == "") {
            if (commentEmoticon == "") {
                alert("내용을 입력해주세요!")
            }
            else {
                const access = localStorage.getItem("access");

                const formData = new FormData();
                formData.append("comment", commentContent);
                formData.append("use_emoticon", commentEmoticon);
                formData.append("music", `${article_id}`);

                const response = await fetch(`${back_base_url}/comments/${articleId}/comment/`, {
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();

                if (response.status == 200) {
                    alert("등록 완료!")
                    window.location.reload()
                } else {
                    alert("잘못 된 요청입니다.");
                }
            }
        } else {
            const access = localStorage.getItem("access");

            const formData = new FormData();
            formData.append("comment", commentContent);
            formData.append("use_emoticon", commentEmoticon);
            formData.append("music", `${article_id}`);

            const response = await fetch(`${back_base_url}/comments/${articleId}/comment/`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (response.status == 200) {
                alert("등록 완료!")
                window.location.reload()
            } else {
                alert("잘못 된 요청입니다.");
            }
        }
    } else {
        alert('로그인 사용자만 등록 가능합니다.')
    }
}

// 댓글 수정 폼
function commentUpdate(comment_id) {
    const comment = document.getElementById(`comment${comment_id}`)
    let comment_save = document.getElementById(`comment${comment_id}`).innerHTML

    const commentP = comment.childNodes[1].lastChild
    const commentPValue = commentP.innerText

    const commentUsedEmoticon = comment.childNodes[1].firstChild
    const commentUsedEmoticonId = commentUsedEmoticon.alt
    const commentUsedEmoticonSrc = commentUsedEmoticon.src

    const emoticonDiv = document.createElement('div')
    emoticonDiv.setAttribute('class', 'card text-center')

    const updateCommentEmoticon = document.createElement('img')
    updateCommentEmoticon.setAttribute('style', 'width: 50px; margin: auto;')
    updateCommentEmoticon.setAttribute('id', 'update_use_emoticon')
    if (commentUsedEmoticonSrc == undefined) {

        updateCommentEmoticon.src = ''
        updateCommentEmoticon.alt = ''
    } else {
        updateCommentEmoticon.src = commentUsedEmoticonSrc
        updateCommentEmoticon.alt = commentUsedEmoticonId

    }
    updateCommentEmoticon.addEventListener('click', function () {
        updateCommentEmoticon.src = ''
        updateCommentEmoticon.alt = ''
    });
    emoticonDiv.appendChild(updateCommentEmoticon)
    commentUsedEmoticon.style.display = 'none'

    const updateEmoticonButton = document.createElement('button')
    updateEmoticonButton.innerText = '이모티콘'
    updateEmoticonButton.setAttribute('class', 'mb-3')
    updateEmoticonButton.setAttribute('id', 'update_emoticon_button')
    updateEmoticonButton.setAttribute('onclick', 'emoticonButtonList("update_emoticon_list", "update_emoticon_popup", "update_emoticon_button", "update_emoticon_images", "update_use_emoticon")')

    const popupParentsDiv = document.createElement('div')
    popupParentsDiv.setAttribute('style', 'height: 0px;')

    const popupDiv = document.createElement('div')
    popupDiv.setAttribute('class', 'card text-center;')
    popupDiv.setAttribute('style', 'position: relative; z-index: 1; margin-top: -17px; display: none;')
    popupDiv.setAttribute('id', 'update_emoticon_popup')
    popupParentsDiv.appendChild(popupDiv)

    const chDiv = document.createElement('div')
    chDiv.setAttribute('class', 'card-header')
    popupDiv.appendChild(chDiv)

    const updateEmoticonList = document.createElement('ul')
    updateEmoticonList.setAttribute('class', 'nav nav-tabs card-header-tabs mb-3')
    updateEmoticonList.setAttribute('id', 'update_emoticon_list')
    chDiv.appendChild(updateEmoticonList)

    const updateEmoticonImages = document.createElement('div')
    updateEmoticonImages.setAttribute('class', 'row row-cols-5 row-cols-md-5')
    updateEmoticonImages.setAttribute('style', 'overflow-y: scroll; height: 220px;')
    updateEmoticonImages.setAttribute('id', 'update_emoticon_images')
    chDiv.appendChild(updateEmoticonImages)


    // 버튼 기능 추가중

    updateEmoticonButton.addEventListener('click', function () {

    });

    emoticonDiv.appendChild(updateEmoticonButton)
    emoticonDiv.appendChild(popupParentsDiv)

    comment.childNodes[1].appendChild(emoticonDiv)

    const updateCommentInput = document.createElement('input')
    updateCommentInput.setAttribute('type', 'text')
    updateCommentInput.setAttribute('class', 'form-control')
    updateCommentInput.setAttribute('id', `update_input${comment_id}`)
    updateCommentInput.value = commentPValue
    comment.childNodes[1].appendChild(updateCommentInput)
    commentP.style.display = 'none'

    const updateButton = comment.childNodes[2].firstChild
    updateButton.setAttribute('onclick', `commentUpdateConfirm(${comment_id})`)



    const cancelButton = comment.childNodes[2].lastChild
    cancelButton.innerText = '취소'
    cancelButton.setAttribute('onclick', ``)
    cancelButton.addEventListener('click', function () {
        comment.innerHTML = comment_save
    });
}

// 수정 확인
async function commentUpdateConfirm(comment_id) {
    const commentUpdateContent = document.getElementById(`update_input${comment_id}`).value;
    const commentUpdateEmoticon = document.getElementById(`update_use_emoticon`).alt;

    if (commentUpdateContent == "") {
        if (commentUpdateEmoticon == "") {
            alert("내용을 입력해주세요!")
        } else {
            const access = localStorage.getItem("access");

            const formData = new FormData();
            formData.append("comment", commentUpdateContent);
            formData.append("music", `${articleId}`);
            formData.append("use_emoticon", commentUpdateEmoticon);

            const response = await fetch(`${back_base_url}/comments/${articleId}/comment/${comment_id}/`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
                method: "PUT",
                body: formData,
            });
            const data = await response.json();

            if (response.status == 200) {
                alert("수정 완료!")
                window.location.reload()
            } else {
                alert("잘못 된 요청입니다.");
            }
        }
    } else {
        const access = localStorage.getItem("access");

        const formData = new FormData();
        formData.append("comment", commentUpdateContent);
        formData.append("music", `${articleId}`);
        formData.append("use_emoticon", commentUpdateEmoticon);

        const response = await fetch(`${back_base_url}/comments/${articleId}/comment/${comment_id}/`, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
            method: "PUT",
            body: formData,
        });
        const data = await response.json();

        if (response.status == 200) {
            alert("수정 완료!")
            window.location.reload()
        } else {
            alert("잘못 된 요청입니다.");
        }
    }
}

// 댓글 삭제
async function commentDelete(comment_id) {
    const access = localStorage.getItem("access");

    if (confirm("삭제하시겠습니까?")) {
        const response = await fetch(
            `${back_base_url}/comments/${articleId}/comment/${comment_id}/`,
            {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
                method: "DELETE",
            }
        );
        if (response.status == 204) {
            alert("삭제되었습니다.");
            window.location.reload()
        } else {
            alert("권한이 없습니다!");
        }
    } else {
        // 취소 버튼을 눌렀을 경우
        return false;
    }
}

window.onload = async function () {
    const access = localStorage.getItem("access");

    const response_comment = await getComment(articleId);

    // 이모티콘 이미지 보기

    // 등록버튼 함수 넣어주기
    const commentCreateButton = document.getElementById("comment_create")

    commentCreateButton.setAttribute('onclick', `commentCreate(${articleId})`)

    // 댓글 리스트 보여주기
    const commentContent = document.getElementById("comment");

    // 이모티콘 이미지 다 가져오기
    const response_emoticon = await fetch(`${back_base_url}/comments/emoticon/images/`, {
        method: "GET",
    });
    const data = await response_emoticon.json();

    response_comment.forEach(element => {
        const cardDiv = document.createElement("div")
        cardDiv.setAttribute('class', 'card')
        cardDiv.setAttribute('style', 'width: 100%; flex-direction: row;')
        cardDiv.setAttribute('id', 'comment' + `${element.id}`)
        cardDiv.setAttribute('value', element.id)
        commentContent.appendChild(cardDiv)

        const nicknameDiv = document.createElement("div")
        nicknameDiv.setAttribute('style', 'width: 15%;')
        nicknameDiv.innerText = element.writer
        cardDiv.appendChild(nicknameDiv)

        const commentDiv = document.createElement("div")
        commentDiv.setAttribute('class', 'card-body')
        commentDiv.setAttribute('style', 'width: 75%;')

        const commentEmoticon = document.createElement('img')

        data.forEach(usedImage => {
            if (usedImage.id == element.use_emoticon) {
                const usedemoticonimage = `${back_base_url}${usedImage.image}`
                commentEmoticon.setAttribute('src', usedemoticonimage)
                commentEmoticon.setAttribute('style', 'width: 50px')
                commentEmoticon.setAttribute('id', `comment_use_emoticon${usedImage.id}`)
                commentEmoticon.setAttribute('alt', `${usedImage.id}`)
                commentDiv.appendChild(commentEmoticon)
            }
        });

        const commentP = document.createElement("p")
        commentP.innerText = element.comment
        commentDiv.appendChild(commentP)
        cardDiv.appendChild(commentDiv)

        const buttonDiv = document.createElement("div")
        cardDiv.appendChild(buttonDiv)
        buttonDiv.setAttribute('style', 'width: 10%;')

        if (localStorage.getItem("access")) {
            const userId = JSON.parse(localStorage.getItem("payload")).user_id

            if (element.writer == userId) {
                const updateButton = document.createElement("button")
                updateButton.setAttribute('onclick', `commentUpdate(${element.id})`)
                updateButton.setAttribute('class', 'mt-3')
                updateButton.innerText = '수정'
                buttonDiv.appendChild(updateButton)

                const deleteButton = document.createElement("button")
                deleteButton.setAttribute('onclick', `commentDelete(${element.id})`)
                deleteButton.setAttribute('class', 'mt-3')
                deleteButton.innerText = '삭제'
                buttonDiv.appendChild(deleteButton)
            }
        }
    });
};
