export function parseRoute(origRoute: string): string {
    const route: string[] = origRoute.split('/');
    route.splice(0, 2);
    return route.join('/');
}
