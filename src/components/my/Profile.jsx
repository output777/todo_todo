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
import { __getAchievementRate } from "../../redux/modules/mainSlice";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getAchievementRate());
  }, []);

  const { achievementRate } = useSelector((state) => state.main);
  //let totalRate = Math.round(achievementRate[1].achievementRate);
  // let totalRate2 = isNaN(totalRate)
  //   ? 0
  //   : Math.round(achievementRate[1].achievementRate);

  const { userInfo, motto } = useSelector((state) => state.my);
  console.log("userInfo", userInfo, userInfo?.myMotto, "motto", motto);

  const [edit, setEdit] = useState(false);
  const [motoInput, setMotoInput] = useState("");

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

    dispatch(__postProfileImg(formData));
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
    dispatch(__getMyInfo());
  }, [dispatch]);

  return (
    <StProfileContainer>
      <StImgInfoBox>
        <StImg>
          {!edit ? (
            <>
              <img src={userInfo && userInfo.profileImage} alt='profile' />
              <div className='rank'>실시간 순위</div>
            </>
          ) : (
            <div onClick={onClickEditProfileImgHandler}>
              <input
                type='file'
                accept='image/*'
                ref={uploadProfileRef}
                onChange={onChangeUploadProfileImageHandler}
              />
              <img src={userInfo && userInfo.profileImage} alt='profile' />
              <div className='editBox'>
                <img src={cameraSvg} alt='imgEdit' style={{ width: "100%" }} />
              </div>
            </div>
          )}
        </StImg>
        <StInfo>
          <p>평균 투두 달성률</p>
          {/* <p>{totalRate2} %</p> */}
          <ProgressBar
            // now={totalRate2}
            style={{
              backgroundColor: "#fff",
              color: "#FF8F27",
              height: "12px",
              marginTop: "5px",
            }}
          />
        </StInfo>
      </StImgInfoBox>
      <StTextBox>
        <p>{userInfo?.nickname}</p>
        {!edit ? (
          <p className='text show'>{motto && motto}</p>
        ) : (
          <div className='editText' onClick={onClickEditTextHandler}>
            <form ref={motoFormRef} onSubmit={onSubmitHandler}>
              <input
                type='text'
                ref={motoInputRef}
                value={motoInput}
                onChange={onChangeMotoInputHandler}
              />
              <button type='button' onClick={onClickEditTextCancelHandler}>
                ✖
              </button>
              <button type='submit'>✔</button>
            </form>
            <p className='text show' ref={motoRef}>
              {motto && motto}
            </p>
            <img
              className='show'
              src={logoPencil}
              alt='editTextImg'
              ref={motoImgRef}
            />
          </div>
        )}
      </StTextBox>
      {!edit ? (
        <StBtn onClick={onClickEditHandler}>프로필 편집</StBtn>
      ) : (
        <StBtn onClick={onClickCompleteHandler}>완료</StBtn>
      )}
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  box-sizing: border-box;
  padding: 2rem 1rem 1rem 1rem;
`;

const StImgInfoBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
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
  width: 168px;
  height: 80px;
  background-color: #ffe9d4;

  border-radius: 10px;
  font-size: 0.9rem;
  padding: 0.5rem 0.8rem;
  box-sizing: border-box;
  text-align: right;
  /* box-shadow: 0px 4px 15px 1px rgba(17, 17, 17, 0.05);*/
  box-shadow: 0px 4px 15px 0px lightgray;

  & p {
    margin: 0;
    color: #ff8f27;
  }

  .progress-bar {
    background-color: #ff8f27;
  }
`;

const StTextBox = styled.div`
  margin-top: 10px;
  height: 90px;

  & p {
    margin: 0;
    color: #111;
    font-size: 1rem;
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
  }
`;

const StBtn = styled.button`
  width: 280px;
  height: 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
  border: none;
  margin: 15px auto 0rem auto;
  /* box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05); */
  box-shadow: 0px 4px 15px 0px lightgray;
`;

export default Profile;
