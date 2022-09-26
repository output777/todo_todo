import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import defaultProfile from "../../assets/img/defaultProfile.jpg";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import pencilSvg from "../../assets/img/pencilSvg.svg";
import Modal from "../utils/Modal";

import { useDispatch, useSelector } from "react-redux";
import {
  __getImages,
  __getMyInfo,
  __postProfileImg,
  __postProfileMoto,
} from "../../redux/modules/mySlice";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const nickname = localStorage.getItem("nickname");

const ProfileEdit = () => {
  const { profileImage } = useSelector((state) => state.my);
  const { userInfo } = useSelector((state) => state.my);
  console.log("userInfo", userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saveStatus, setSaveStatus] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [profileImageState, setProfileImageState] = useState();
  const [mottoInput, setMottoInput] = useState(userInfo?.myMotto);
  const profileUploadRef = useRef(null);

  let formData = new FormData();
  let newCamp = { myMotto: mottoInput };

  for (let key of formData.keys()) {
    console.log(key, formData.get(key));
  }

  // 완료버튼 클릭
  const onClickProfileEditComplete = () => {
    formData.append("multipartFile", profileImageState);
    formData.append(
      "dto",
      new Blob([JSON.stringify(newCamp)], { type: "application/json" })
    );

    dispatch(__postProfileImg(formData));
    dispatch(__getMyInfo(nickname));
    navigate("/my");
  };

  const onClickUploadPhotoHandler = () => {
    profileUploadRef.current.click();
  };

  const modalToggleHandler = (parameter) => {
    setModalView(!modalView);
  };

  useEffect(() => {
    dispatch(__getMyInfo(nickname));
  }, [dispatch]);

  // 좌우명 입력시
  const mottoInputHandler = (e) => {
    setMottoInput(e.target.value.slice(0, 40));
  };

  // 이미지 에러 발생시
  const handleImgError = (e) => {
    e.target.src = profileImgSvg;
  };

  // --- Dropzone, Preview ---
  // const thumbsContainer = {
  //   display: "flex",
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   marginTop: 16,
  // };

  // const thumb = {
  //   display: "inline-flex",
  //   borderRadius: 2,
  //   border: "1px solid #eaeaea",
  //   borderRadius: "100px",
  //   marginBottom: 8,
  //   marginRight: 8,
  //   width: 100,
  //   height: 100,
  //   padding: 4,
  //   boxSizing: "border-box",
  // };

  // const thumbInner = {
  //   display: "flex",
  //   minWidth: 0,
  //   overflow: "hidden",
  // };

  // const img = {
  //   display: "block",
  //   width: "auto",
  //   height: "100%",
  // };

  // function Previews(props) {
  //   const [files, setFiles] = useState([]);
  //   const { getRootProps, getInputProps } = useDropzone({
  //     accept: {
  //       "image/*": [],
  //     },
  //     onDrop: (acceptedFiles) => {
  //       setFiles(
  //         acceptedFiles.map((file) =>
  //           Object.assign(file, {
  //             preview: URL.createObjectURL(file),
  //           })
  //         )
  //       );
  //     },
  //   });

  //   const thumbs = files.map((file) => (
  //     <div style={thumb} key={file.name}>
  //       <div style={thumbInner}>
  //         <img
  //           src={file.preview}
  //           style={img}
  //           // Revoke data uri after image is loaded
  //           onLoad={() => {
  //             URL.revokeObjectURL(file.preview);
  //           }}
  //         />
  //       </div>
  //     </div>
  //   ));

  //   useEffect(() => {
  //     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //     return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   }, []);

  //   return (
  //     <section className="container" style={{ width: "100%" }}>
  //       <div
  //         {...getRootProps({ className: "dropzone" })}
  //         style={{
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <input {...getInputProps()} />
  //         <div className="pencilBox" onClick={onClickUploadPhotoHandler}>
  //           <img className="pencil" src={pencilSvg} />
  //           <input type="file" accept="image/*" />
  //         </div>
  //         {thumbs.length > 0 ? (
  //           <StImg src={userInfo?.profileImage} onError={handleImgError} />
  //         ) : (
  //           <StImg src={profileImgSvg} onError={handleImgError} />
  //         )}
  //       </div>
  //       <aside style={thumbsContainer}>
  //         {thumbs}
  //         {console.log("thumbs", thumbs)}
  //         {/* {profileImgSvg} */}
  //       </aside>
  //     </section>
  //   );
  // }

  const readImage = (input) => {
    // 인풋 태그에 파일이 있는 경우
    if (input.files && input.files[0]) {
      // FileReader 인스턴스 생성
      const reader = new FileReader();
      // 이미지가 로드가 된 경우
      reader.onload = (e) => {
        const previewImage = document?.getElementById("preview-image");
        previewImage.src = e.target.result;
      };
      // reader가 이미지 읽도록 하기
      reader.readAsDataURL(input.files[0]);

      console.log("input.files[0]", input.files[0]);
    }
  };
  // input file에 change 이벤트 부여
  const inputImage = document?.getElementById("input-image");
  inputImage?.addEventListener("change", (e) => {
    readImage(e.target);
    console.log("e.target", e.target, e.target.files[0]);
    // setProfileImageState(e.target.files[0]);
  });

  // Browser Image Compression
  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    console.log(imageFile);
    console.log("originalFile instanceof Blob", imageFile instanceof Blob);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      );
      console.log(`compressedFile size ${compressedFile.size}`);
      // await uploadToServer(compressedFile);
      setProfileImageState(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StTitle>
        <div
          className="arrow"
          onClick={() => {
            if (saveStatus == false) {
              setModalView(true);
            } else {
              navigate("/my");
            }
          }}
        />
        <div className="title">프로필 편집</div>
        <button onClick={onClickProfileEditComplete}>완료</button>
      </StTitle>

      <StLine></StLine>

      <StImgDiv>
        <div className="image-container">
          <img
            style={{ width: "6em", height: "6em", borderRadius: "100px" }}
            id="preview-image"
            src={userInfo?.profileImage}
            onError={handleImgError}
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="input-image"
            ref={profileUploadRef}
            onChange={handleImageUpload}
          />
          {/* ----- 연필 ----- */}
          <div className="pencilBox" onClick={onClickUploadPhotoHandler}>
            <img className="pencil" src={pencilSvg} />
          </div>
        </div>
      </StImgDiv>

      <StMotto>
        <div>좌우명</div>
        <textarea
          className="textArea"
          value={mottoInput}
          onChange={mottoInputHandler}
        ></textarea>
        <div className="mottoInputCount">{mottoInput?.length}/40</div>
      </StMotto>

      {/* -------- 안내창 모달 ---------*/}
      {modalView ? (
        <Modal
          visible={modalView}
          closable={true}
          maskClosable={true}
          onClose={modalToggleHandler}
          radius="48px"
          top="40%"
          width="90%"
          height="230px"
          backgroundcolor="#46464624"
        >
          <StModalTop>
            <div className="title">저장되지 않은 변경 사항</div>
            <div>뒤로가기 하시겠습니까?</div>
            <div>변경사항이 저장되지 않았습니다.</div>
          </StModalTop>
          <StModalBottom>
            <div
              className="cancel"
              onClick={() => {
                setModalView(false);
              }}
            >
              취소
            </div>
            <div
              className="confirm"
              onClick={() => {
                navigate("/my");
              }}
            >
              확인
            </div>
          </StModalBottom>
        </Modal>
      ) : null}
    </>
  );
};

export default ProfileEdit;

const StModalTop = styled.div`
  height: 75%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 1em;
  }
`;
const StModalBottom = styled.div`
  border-top: 1px solid lightgray;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 25%;

  div {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .confirm {
    border-left: 1px solid lightgray;
  }
`;

const StMotto = styled.div`
  width: 90%;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;

  .textArea {
    border: 1px solid black;
    border-radius: 20px;
    width: 90%;
    height: 10em;
  }

  .mottoInputCount {
    color: #ff7b00;
  }
`;
const StImgDiv = styled.div`
  width: 80%;
  margin: 10% auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .image-container {
    position: relative;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
      width: 50%;
      margin: auto;
    }
  }
  .pencilBox {
    position: absolute;
    right: -1.3em;
    bottom: -0.3em;

    width: 3em;
    height: 3em;
    border-radius: 100%;
    background-color: #ff8f27;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .pencil {
  }

  & input {
    display: none;
  }
`;
const StImg = styled.img`
  width: 40%;
  height: 40%;
  border-radius: 100px;
`;

const StTitle = styled.div`
  width: 90%;
  margin: auto;
  height: 10vh;
  font-weight: bold;
  font-size: 1.2em;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .title {
    position: relative;
    left: 1.3em;
  }

  button {
    width: 15%;
    height: 50%;
    font-size: 0.9em;
    background-color: white;
    color: #ff7b00;
    border: none;
  }

  .arrow {
    position: relative;
    /* background-color: gray; */
  }

  .arrow::after {
    /* background-color: gray; */
    position: absolute;
    left: 0;
    top: -0.3em;
    content: "";
    width: 0.7em; /* 사이즈 */
    height: 0.7em; /* 사이즈 */
    border-top: 3px solid #ff7b00; /* 선 두께 */
    border-right: 3px solid #ff7b00; /* 선 두께 */
    transform: rotate(225deg);
  }
`;

const StLine = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #f1f3f5;
`;
