/* type별 정리
0 : 무기
1 : 갑옷
2 : 방패
3 : 투구
4 : 반지
5 : 목걸이
6 : 술(막걸리)
7 : 먹는 음식
8 : 비서
9 : 전(돈)
10: 퀘스트재료
11 : 기타
 */
export interface Level {
    level: number;
    job: string;
    exp: number;
    total: number;
}
