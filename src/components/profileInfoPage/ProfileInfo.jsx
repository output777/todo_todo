
import axios from 'axios';
import { debounce, escapeRegExp } from 'lodash';
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import searchSvg from '../../assets/img/searchSvg.svg'
import regionSvg from '../../assets/img/regionSvg.svg'
import cancelSvg from '../../assets/img/cancelSvg.svg';


const ProfileInfo = () => {
  const [nickname, setNickname] = useState("");

  const [highschools, setHighschools] = useState([]);
  const [highschoolInput, setHighschoolInput] = useState("");
  const [highschoolResult, setHighschoolResult] = useState([]);

  const nicknameRef = useRef(null);
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);

  const onChangeNicknameHandler = (e) => {
    const { value } = e.target;
    let val = value.trim();
    setNickname(val);

    if (val.length > 0) {
      nicknameRef.current.classList.add("active");
    } else {
      nicknameRef.current.classList.remove("active");
    }
  };

  const onClickOneRefHandler = () => {
    oneRef.current.classList.add("active");
    twoRef.current.classList.remove("active");
    threeRef.current.classList.remove("active");
  };

  const onClickTwoRefHandler = () => {
    oneRef.current.classList.remove("active");
    twoRef.current.classList.add("active");
    threeRef.current.classList.remove("active");
  };

  const onClickThreeRefHandler = () => {
    oneRef.current.classList.remove("active");
    twoRef.current.classList.remove("active");
    threeRef.current.classList.add("active");
  };

  const getHighschool = async () => {
    const { data } = await axios.get(
      "https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=8b6987e3437f2f606c0b32a837986a81&svcType=api&svcCode=SCHOOL&contentType=json&gubun=high_list&perPage=2378&searchSchulNm=%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90"
    );
    setHighschools([...data.dataSearch.content]);
  };

  const ch2pattern = (ch) => {
    const offset = 44032;

    if (/[가-힣]/.test(ch)) {
      const chCode = ch.charCodeAt(0) - offset;

      if (chCode % 28 > 0) {
        return ch;
      }

      const begin = Math.floor(chCode / 28) * 28 + offset;
      const end = begin + 27;
      return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    }

    if (/[ㄱ-ㅎ]/.test(ch)) {
      const con2syl = {
        ㄱ: "가".charCodeAt(0),
        ㄲ: "까".charCodeAt(0),
        ㄴ: "나".charCodeAt(0),
        ㄷ: "다".charCodeAt(0),
        ㄸ: "따".charCodeAt(0),
        ㄹ: "라".charCodeAt(0),
        ㅁ: "마".charCodeAt(0),
        ㅂ: "바".charCodeAt(0),
        ㅃ: "빠".charCodeAt(0),
        ㅅ: "사".charCodeAt(0),
      };
      const begin =
        con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl["ㅅ"];
      const end = begin + 587;
      return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    }
    return escapeRegExp(ch);
  };

  const createFuzzyMatcher = (input) => {
    const pattern = input.split("").map(ch2pattern).join(".*?");
    return new RegExp(pattern);
  };

  const onChangeSearchHandler = (e) => {
    const { value } = e.target;
    let val = value.trim();
    setHighschoolInput(val);

    const regex = createFuzzyMatcher(val);


    const resultData = highschools.filter((row) => {
      return regex.test(row['schoolName'])
    }).map((row) => {
      console.log(row);
      return { school: row['schoolName'], adres: row['adres'] };
    });
    setHighschoolResult(resultData);
  };

  const onClickSelectHandler = (e) => {
    setHighschoolInput(e.target.textContent);
    setHighschoolResult([])
  }

  const onClickSearchCancelHandler = () => {
    setHighschoolInput("");
    setHighschoolResult([]);
  }

  useEffect(() => {
    getHighschool();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <StInfoTitle>
        <p style={{ margin: 0 }}>회원 정보를 입력해주세요</p>
      </StInfoTitle>
      <StInfoNicknameBox>
        <p>닉네임</p>

        <div ref={nicknameRef}>
          <input type='text' placeholder='2-12자의 영문 한글만 사용 가능' value={nickname} onChange={onChangeNicknameHandler} />
          <button>중복 확인</button>
        </div>
      </StInfoNicknameBox>
      <StHighschoolBox>
        <p>고등학교</p>
        <div className='gradeBox'>
          <div ref={oneRef} onClick={onClickOneRefHandler}>
            1학년
          </div>
          <div ref={twoRef} onClick={onClickTwoRefHandler}>
            2학년
          </div>
          <div ref={threeRef} onClick={onClickThreeRefHandler}>
            3학년
          </div>
        </div>
        <div className='inputBox' style={{ display: 'flex' }}>
          <input type='text' placeholder='고등학교를 검색해주세요' value={highschoolInput} onChange={onChangeSearchHandler} />
          {highschoolInput.length > 0
            ?
            <button onClick={onClickSearchCancelHandler}>
              <img src={cancelSvg} alt='search' />
            </button>
          ) : (
            <button>
              <img src={searchSvg} alt='search' />
            </button>
          }
        </div>
      </StHighschoolBox>
      <StHighschoolSearchBox>
        {highschoolInput.length > 0
          ? highschoolResult && highschoolResult.map((data, index) => (
            <div className='content' key={index}>
              <div className='school' onClick={onClickSelectHandler}>{data.school}</div>
              <div className='region'><img src={regionSvg} />{data.adres}</div>
            </div>
          ))
          : null
        }
      </StHighschoolSearchBox>
      <StBtnBox>
        <button>투두투두 시작하기!</button>
      </StBtnBox>
    </div>
  );
};

const StInfoTitle = styled.div`
  font-size: 1.4rem;
  padding: 1.5rem 1rem 1rem 1rem;
  border-bottom: 1px solid #ffe9d4;
`;

const StInfoNicknameBox = styled.div`
  padding: 1rem 0;

  & div {
    display: flex;
    align-items: center;
  }

  & div input {
    border: 1px solid #e8e8e8;
    height: 54px;
    padding: 0 0.5rem;
    width: 240px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    outline: none;
  }

  & div input::placeholder {
    font-size: 0.9rem;
  }

  & div button {
    border: 1px solid #E8E8E8;

    border-left: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 54px;
    padding: 0 1rem;
    font-size: 0.9rem;
    background-color: #fff;
    color: #ff7b00;
  }

  & div.active input {
    border: 1px solid #ff7b00;
    border-right: 1px solid #e8e8e8;
    transition: border 0.2s;
  }

  & div.active button {
    border: 1px solid #ff7b00;
    border-left: none;
    transition: border 0.2s;
  }
`;

const StHighschoolBox = styled.div`
  padding: 1rem 0 0.5rem 0;
  
  & .gradeBox {
    display: flex;

    div {
      border: 1px solid #dedddd;
      padding: 0.5rem 0.7rem;
      border-radius: 20px;
      margin-right: 0.5rem;
      color: #767676;
      font-size: 0.9rem;
    }

    div.active {
      border: 1px solid #ff8f27;
      background-color: #ffe9d4;
      color: #ff8f27;
    }
  }

  & .inputBox {
    margin-top: 1rem;

    input {
      border: 1px solid #e8e8e8;
      border-right: none;
      padding: 0.5rem;
      width: 290px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      outline: none;
    }

    & input::placeholder {
      font-size: 0.9rem;
    }

    & button {
      border: 1px solid #e8e8e8;
      border-left: none;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: 0.7rem 1rem;
      font-size: 0.9rem;
      background-color: #fff;
      color: #ff7b00;
    }
  }
`;

const StHighschoolSearchBox = styled.div`
  width: 100%;
  height: 220px;
  background-color: #fafafa;
  overflow-y: scroll;
  border-radius: 10px;

  & .content {
    align-items: center;
    padding: 0.5rem 1rem;

    .school {
      font-size: 1rem;
      padding: 0.5rem 0;
    }

    .region {
      font-size: 0.7rem;
      color: #9f9e9e;
    }
  }
`;

const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  margin: 0;

  & button {
    background-color: #ff8f27;
    border: none;
    width: 280px;
    height: 50px;
    border-radius: 16px;
    color: white;
    margin: 0;
  }
`;

export default ProfileInfo;