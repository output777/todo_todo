import React from "react";
import styled from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useState } from "react";
import cameraSvg from "../../assets/img/cameraSvg.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getMyInfo,
  __postProfileImg,
  __postProfileMoto,
} from "../../redux/modules/mySlice";
import logoPencil from "../../assets/img/loginPage/logoPencil.svg";
import { useRef } from "react";
// import { __getTotalRate } from "../../redux/modules/mainSlice";
import { useNavigate } from "react-router-dom";
import settingSvg from "../../assets/img/myPage/settingSvg.svg";
import defaultProfile from "../../assets/img/defaultProfile.jpg";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import Setting from "./Setting";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // dispatch(__getTotalRate());
  }, []);

  const { userInfo, motto } = useSelector((state) => state.my);
  // console.log("userInfo", userInfo, userInfo?.myMotto, "motto", motto);

  const [edit, setEdit] = useState(false);
  const [motoInput, setMotoInput] = useState("");
  const [settingMenu, setSettingMenu] = useState(false);

  const uploadProfileRef = useRef(null);
  const motoFormRef = useRef(null);
  const motoInputRef = useRef(null);
  const motoRef = useRef(null);
  const motoImgRef = useRef(null);

  const onClickEditHandler = () => {
    setEdit(true);
    setMotoInput(motto);
  };

  const onClickCompleteHandler = () => {
    setEdit(false);
  };

  const onChangeUploadProfileImageHandler = (e) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append("multipartFile", e.target.files[0]);

    // dispatch(__postProfileImg(formData));
  };

  const onClickEditProfileImgHandler = () => {
    uploadProfileRef.current.click();
  };

  const onClickEditTextHandler = () => {
    motoFormRef.current.classList.add("show");
    motoInputRef.current.focus();
    motoRef.current.classList.remove("show");
    motoImgRef.current.classList.remove("show");
  };

  const onChangeMotoInputHandler = (e) => {
    const { value } = e.target;
    setMotoInput(value);
  };

  const onClickEditTextCancelHandler = (e) => {
    e.stopPropagation();
    motoFormRef.current.classList.remove("show");
    motoRef.current.classList.add("show");
    motoImgRef.current.classList.add("show");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newMoto = {
      myMotto: motoInput,
    };
    await dispatch(__postProfileMoto(newMoto));
    await dispatch(__getMyInfo());
    setMotoInput("");
    motoFormRef.current.classList.remove("show");
    motoRef.current.classList.add("show");
    motoImgRef.current.classList.add("show");
  };

  useEffect(() => {
    setMotoInput(motto);
  }, [setMotoInput, motto]);

  useEffect(() => {
    // dispatch(__getMyInfo());
  }, [dispatch]);

  return (
    <>
      <StProfileContainer>
        <div className="title">
          <h3 style={{ fontSize: "22px", fontWeight: "bold", margin: "5% 7%" }}>
            마이페이지
          </h3>
          <img
            src={settingSvg}
            onClick={() => {
              navigate("/setting");
            }}
          />
        </div>
        <StLine></StLine>
        <StImgInfoBox>
          <StImg>
            <img src={profileImgSvg} alt="profile" />
            {/* {!edit ? (
              <>
                <img src={defaultProfile} alt="profile" />
              </>
            ) : (
              <div onClick={onClickEditProfileImgHandler}>
                <input
                  type="file"
                  accept="image/*"
                  ref={uploadProfileRef}
                  onChange={onChangeUploadProfileImageHandler}
                />
                <img src={userInfo && userInfo.profileImage} alt="profile" />
                <div className="editBox">
                  <img
                    src={cameraSvg}
                    alt="imgEdit"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            )} */}
          </StImg>
          <StInfo>
            <div className="nextToPicture">
              <span className="count">60</span>
              <span className="text">게시물</span>
            </div>
            <div className="nextToPicture">
              <span className="count">60</span>
              <span className="text">팔로워</span>
            </div>
            <div className="nextToPicture">
              <span className="count">60</span>
              <span className="text">팔로잉</span>
            </div>
          </StInfo>
        </StImgInfoBox>
        <StStatusDiv>
          <div className="userName">이름</div>
          <div>09년생 / INFJ / 일반계 여고</div>
        </StStatusDiv>
        {/* <StTextBox>
          <p>{userInfo?.nickname}</p>
          {edit ? (
            <p className="text show">{motto && motto}</p>
          ) : (
            <div className="editText" onClick={onClickEditTextHandler}>
              <form ref={motoFormRef} onSubmit={onSubmitHandler}>
                <input
                  type="text"
                  ref={motoInputRef}
                  value={motoInput}
                  onChange={onChangeMotoInputHandler}
                />
                <button type="button" onClick={onClickEditTextCancelHandler}>
                  ✖
                </button>
                <button type="submit">✔</button>
              </form>
              <p className="text show" ref={motoRef}>
                {motto && motto}
              </p>
              <img
                className="show"
                src={logoPencil}
                alt="editTextImg"
                ref={motoImgRef}
              />
            </div>
          )}
        </StTextBox> */}
        <StBtn
          onClick={() => {
            navigate("/profileedit");
          }}
        >
          프로필 편집
        </StBtn>
      </StProfileContainer>
    </>
  );
};

const StStatusDiv = styled.div`
  width: 90%;
  margin: 0.3em auto 0 auto;
  .userName {
    font-weight: 1000;
  }
`;

const StLine = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #ffe9d4;
`;

const StProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  box-sizing: border-box;

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 1.5em;
  }
`;

const StImgInfoBox = styled.div`
  width: 90%;
  margin: 1em auto 0 auto;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: relative;

  & img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  & div.rank {
    width: 70px;
    height: 20px;
    background-color: #e2eaff;
    color: #618af2;
    font-size: 0.7rem;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0.1rem;
    text-align: center;
    position: absolute;
    bottom: -5px;
    left: 5px;
  }

  & div.editBox {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ff7b00;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    position: absolute;
    bottom: 0;
    left: 60px;
  }

  & input {
    display: none;
  }
`;

const StInfo = styled.div`
  width: 70%;
  height: 80px;

  border-radius: 10px;
  font-size: 0.9rem;
  padding: 0.5rem 0.8rem;

  /* box-shadow: 0px 4px 15px 0px lightgray; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .nextToPicture {
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .count {
      font-size: 1.2em;
      font-weight: bold;
    }
    .text {
      color: gray;
      font-weight: 7000;
    }
  }
`;

const StTextBox = styled.div`
  margin-top: 10px;

  /* height: 90px; */
  /* p {
    color: #111;
    font-size: 2rem;
  }

  & p.text {
    margin-top: 5px;
    width: 90%;
    font-size: 0.9rem;
    display: none;
  }

  & p.text.show {
    margin-top: 5px;
    width: 90%;
    font-size: 0.9rem;
    display: block;
  }

  & div.editText {
    margin-top: 5px;
    position: relative;
    height: 30px;
    border-bottom: 1px solid #ececec;
    display: flex;

    form {
      width: 100%;
      display: none;
    }

    form.show {
      display: block;

      input {
        border: 1px solid red;
        width: 80%;
        border: none;
        outline: none;
      }
    }

    button {
      width: 10%;
      font-size: 1rem;
      border: none;
      background-color: #fff;
    }

    img {
      width: 20px;
      height: 20px;
      display: none;
    }

    img.show {
      width: 20px;
      height: 20px;
      display: block;
    }
  } */
`;

const StBtn = styled.button`
  width: 50%;
  height: 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
  border: none;
  margin: 15px auto 0rem auto;
  /* box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05); */
  box-shadow: 0px 4px 15px 0px lightgray;
`;

export default Profile;
