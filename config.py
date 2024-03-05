class Config:
    # 데이터베이스 연결 정보
    SQLALCHEMY_DATABASE_URI = 'postgresql://kimtaemin:kimtaemin@localhost:5432/test_board'
    SQLALCHEMY_TRACK_MODIFICATIONS = False