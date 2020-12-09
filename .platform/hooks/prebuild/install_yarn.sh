#!/bin/sh

curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum install -y nodejs

curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo yum -y install yarn
