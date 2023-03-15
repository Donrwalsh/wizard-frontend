## Notes
The plan is to ultimately migrate these environment notes to a separate repo, but for now since they are sparse I'll leave them here.

### Local Development
I am using VsCode to develop this app. I haven't installed any extensions yet, but I am using the default git feature. I logged into github through the browser so now I'm able to do git operations from within VsCode. (I am used to using Sourcetree, so this is a helpful learning experience for me).

I enabled format on save but have not yet defined any specific formatting rules so the whole project should be formatted based on whatever came default.

### Dev Server
I run a dev server on a Raspberry Pi. It runs Jenkins locally which was obnoxious to set up. The Jenkins install failed several times and ultimately required changing the timeout to allow for infinite time via `vi /lib/systemd/system/jenkins`. Once I did that the install went through just fine. (Prior to this I got things working on a Jenkins running on a docker image but failed to get it to be able to properly hook into the host's docker service for deployment. Since I want to ultimately deploy my app using containers, this was a no-go).

So I have a pipeline job that checks my github repo every 5 minutes for updates. Upon seeing an update, it will run through the pipeline steps in the `Jenkinsfile` at the root of this project. It builds the app, then run tests (currently disabled - need to sort out headless test running) and then generates a basic docker image using the `Dockerfile` and deploys it as a container locally.

This whole dev environment setup is convenient because I can always access the latest deployed version of my code on any device on my local network. I can also access Jenkins the same way, but I generally don't need to because it is configured to be operating in the shadows without intervention.