# QR을 이용한 무인 셀프계산대 연습하기

## 사용법

```bash
$ git clone <주소>

$ cd be

conda 있으면
$ conda create -n <이름> python=3.10
$ conda activate <이름>

없으면
$ python -m venv <이름>
$ source <이름>/bin/activate  # mac
$ source <이름>\Scripts\activate  # window


# 가상환경 사용시 activate

$ pip install -r requirements.txt

$ python manage.py runserver

```
```bash
$ cd fe

$ npm install

$ npm run start
```
### 주요기능

localhost:3000/product/list => 상품등록된 상품 및 QR 리스트
localhost:3000 => 셀프계산시작
localhost:3000/cart/ => 상품QR을 스캔해주세요
=> 상품구매완료 영수증(미구현)

api/product/    =>product app
register/
list/
search/
detail/
category/register/
category/list/
category/delete/
category/update/

api/receipt/   => receipt app

메인페이지/QR상품스캔페이지
![1번](https://github.com/user-attachments/assets/2f14a515-b21c-431e-89b9-599b706defee)
상품리스트페이지 QR스캔후 QR상품스캔페이지
![3번](https://github.com/user-attachments/assets/65ce4d36-b0e7-47d5-8be0-c69621bb2bfc)
결제진행모달페이지    결제가 완료페이지( 구매완료 음성과 영수증이 출력됩니다(미구현))
![2번](https://github.com/user-attachments/assets/11ab492d-0977-42f1-973a-b8c7609f31b5)


