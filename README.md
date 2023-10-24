# Running Locally

## First Time Setup (in progress)

_Note_: The following steps assume you've already set up the separate API project.

- Clone the repo
- Use rbenv (or another tool) to set the local Ruby version to 2.7.6
- To avoid the issues described in "Issues with Ruby Version" (below) add the following line to your .zshrc file:

```zsh
eval "$(rbenv init -)"
```

- Run `npm run refresh`
  Once you've followed the above steps, you should be ready to run `npm run ios` and start the app

## Issues with Ruby Version

This app uses Ruby 2.7.6. I use rbenv to set the Ruby version locally. However, sometimes there are issues where the Ruby version is not set correctly. If you run into this issue, you can run the following command to set the Ruby version:

```zsh
rbenv local 2.7.6
```

If after running that command you still get an error like this:

```zsh
Your Ruby version is 3.2.2, but your Gemfile specified 2.7.6
```

Then the issue is likely that for whatever reason your PATH does not contain a necessary reference to rbenv. You can fix this by running the following command:

```zsh
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```

I've ran into this issue a few times and I'm not sure what keeps resetting the PATH but this is a good fix. I got it from this StackOverflow post: <https://stackoverflow.com/questions/10940736/rbenv-not-changing-ruby-version>

_UPDATE_: I've added the following line to my .zshrc file to avoid this issue:

```zsh
eval "$(rbenv init -)"
```
