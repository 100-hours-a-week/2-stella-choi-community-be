module.exports = {
    // 회원가입
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    NOT_SAME_PASSWORD: 'NOT_SAME_PASSWORD',
    INVALID_FORMAT: 'INVALID_FORMAT',
    DUPLICATE_NICKNAME: 'DUPLICATE_NICKNAME',
    DUPLICATE_EMAIL: 'DUPLICATE_EMAIL',
    MISSING_FIELD: 'MISSING_FIELD',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    NULL_RESULT: 'NULL_RESULT',

    // 로그인
    INVALID_EMAIL_FORMAT: 'INVALID_EMAIL_FORMAT',
    NOT_AUTHORIZED: 'NOT_AUTHORIZED',
    NO_USER: 'NO_USER',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    INVALID_PASSWORD: 'INVALID_PASSWORD',

    // 인증, 인가
    MISSING_SESSION: 'MISSING_SESSION',
    NOT_FOUND_USER: 'NOT_FOUND_USER',

    // 회원정보조회 성공
    GET_INFO_SUCCESS: 'GET_INFO_SUCCESS',

    // 회원정보수정
    EDIT_PROFILE_SUCCESS: 'EDIT_PROFILE_SUCCESS',
    INVALID_NICKNAME: 'INVALID_NICKNAME',

    // 비밀번호수정
    SAME_BEFORE_PASSWORD: 'SAME_BEFORE_PASSWORD',
    EDIT_PASSWORD_SUCCESS: 'EDIT_PASSWORD_SUCCESS',

    // 회원탈퇴
    DELETE_INFO_SUCCESS: 'DELETE_INFO_SUCCESS',

    // 로그아웃
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

    // 게시글 조회
    MISSING_PARAMETER: 'MISSING_PARAMETER',
    GET_ALL_BOARD_SUCCESS: 'GET_ALL_BOARD_SUCCESS',

    // 게시글 추가
    INVALID_TITLE: 'INVALID_TITLE',
    CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',

    // 게시글 조회수 추가
    INCREMENT_VIEW_COUNT_SUCCESS: 'INCREMENT_VIEW_COUNT_SUCCESS',
    INCREMENT_VIEW_COUNT_FAIL: 'INCREMENT_VIEW_COUNT_FAIL',

    // 게시글 상세 조회
    MISSING_VARIABLE: 'MISSING_VARIABLE',
    GET_POST_DETAIL_SUCCESS: 'GET_POST_DETAIL_SUCCESS',

    // 게시글 수정
    EDIT_POST_SUCCESS: 'EDIT_POST_SUCCESS',
    ACCESS_DENIED: 'ACCESS_DENIED',

    // 게시글 삭제
    DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS',
    DELETE_POST_FAIL: 'DELETE_POST_FAIL',

    // 댓글 추가
    CREATE_COMMENT_SUCCESS: 'CREATE_COMMENT_SUCCESS',

    // 댓글 수정
    EDIT_COMMENT_SUCCESS: 'EDIT_COMMENT_SUCCESS',

    // 댓글 삭제
    DELETE_COMMENT_SUCCESS: 'DELETE_COMMENT_SUCCESS',
    DELETE_COMMENT_FAIL: 'DELETE_COMMENT_FAIL',
    NO_COMMENT: 'NO_COMMENT',

    // 좋아요 추가
    CREATE_LIKE_SUCCESS: 'CREATE_LIKE_SUCCESS',
    DUPLICATE_LIKE: 'DUPLICATE_LIKE',

    // 좋아요 조회
    GET_LIKES_SUCCESS: 'GET_LIKES_SUCCESS',

    // 좋아요 삭제
    DELETE_LIKE_SUCCESS: 'DELETE_LIKE_SUCCESS',
    NO_LIKE_DATA: 'NO_LIKE_DATA',
};
