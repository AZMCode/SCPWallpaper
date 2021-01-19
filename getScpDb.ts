import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.3-alpha2/deno-dom-wasm.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";
let scpArray: [number,string][] = [];
for(let [index] of new Array(5).entries()){
    const seriesUrl = index === 0?"http://www.scpwiki.com/scp-series":`http://www.scpwiki.com/scp-series-${index+1}`;
    const seriesResponse = await fetch(seriesUrl);
    const seriesHTML = await seriesResponse.text();
    const seriesPage = new DOMParser().parseFromString(seriesHTML,"text/html");
    assert(seriesPage !== null);
    const mainSection = seriesPage.getElementById("page-content");
    assert(mainSection !== null);
    const listing = mainSection.children[0];
    const lists = listing.getElementsByTagName("ul");
    for(const list of lists){
        const articles = list.getElementsByTagName("li");
        for(const article of articles){
            const scpString = article.textContent;
            const parseMatch = scpString.match(/^SCP-(?<scpId>.+) - (?<scpName>.+)$/);
            if(parseMatch !== null){
                const matchingGroups = parseMatch.groups;
                assert(matchingGroups !== undefined);
                const scpId = matchingGroups["scpId"];
                const scpName = matchingGroups["scpName"];
                const numScpId = parseInt(scpId);
                scpArray.push([numScpId,scpName]);
            } else {
                console.log(`Bad Match!: ${scpString}`);
            }
        }
    }
}
await Deno.writeFile("scpDb.json",new TextEncoder().encode(JSON.stringify(scpArray)));
