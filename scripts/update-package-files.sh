set -e

if ! [ "$HAS_COMMITTED_TO_MASTER" ]; then
    git add package.json bower.json
    git commit -m "bump release to $RELEASE_NAME"
    git push https://$GITHUB_TOKEN@github.com master
    git tag "$RELEASE_NAME"
    export HAS_COMMITTED_TO_MASTER=1;
fi