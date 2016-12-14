// 差分约束系统 转为 Bellmanford（SPFA）, 判断负环
#include <iostream>
#include <cstring>
using namespace std;
#define maxn 1005

struct Edge {
    int u, v, w;
    Edge() {}
    Edge(int uu, int vv, int ww) :u(uu), v(vv), w(ww) {}
}e[maxn*maxn];

int sd[maxn];	// 前i个兵营中的最大士兵
int d[maxn];
int n, m, l;

bool bellmanford(int x)
{
    memset(d, 999999, sizeof(d));
    d[x] = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < l; j++) {
            int u = e[j].u, v = e[j].v, w = e[j].w;
            if (d[v] > d[u] + w)
                d[v] = d[u] + w;
        }
    }
    // 负环判断
    for (int i = 0; i < l; i++)
        if (d[e[i].v] > d[e[i].u] + e[i].w)
            return false;
    return true;
}

int main() {
    while (cin >> n >> m) {					// 军营数n
        int a, b, c, number;
        memset(sd, 0, sizeof(sd));
        l = 0;
        for (int i = 1; i <= n; i++) {
            cin >> number;
            e[l++] = Edge(i, i - 1, 0);			// (i-1) - (i) <=0
            e[l++] = Edge(i - 1, i, number);		// (i) - (i-1) <= temp
        }
        for (int i = 1; i <= m; i++) {
            cin >> a >> b >> c;
            e[l++] = Edge(b, a-1, -c);			// b - (a-1) >=c -> (a-1) - b <= -c
        }
        // 计算(n) - (0) >= ? 即 (0) - (n) <= -?, 所以bellmanford(n)后输出-d[0]
        if (!bellmanford(n))	cout << "Bad Estimtions" << endl;
        else  cout << -d[0] << endl;
    }
    return 0;
}