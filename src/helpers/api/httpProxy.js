import config from '../../config';
import httpProxy from 'express-http-proxy';

const VALID_END_POINTS_FOR_SESSION = /\/(login|signups\/complete\/|invitations\/accept)/;

/**
 * Check if API response can set session
 *
 * @param {Object} req
 * @param {Object} res
 * @return {Boolean}
 */
const canSetSession = (req, res) => {
  return req.method === 'POST' &&
        res.statusCode === 200 &&
        VALID_END_POINTS_FOR_SESSION.test(req.path);
};

export default httpProxy(config.apiHost, {
  forwardPath: (req) => {
    const originalPath = require('url').parse(req.url).path;

    return '/api/v1' + originalPath;
  },
  intercept: (rsp, data, req, res, callback) => {
    let respondData;

    if (canSetSession(req, res)) {
      respondData = JSON.parse(data.toString('utf8'));
      req.session.user_id = respondData.id;
      respondData = JSON.stringify(respondData);
    }

    callback(null, respondData || data);
  },
  decorateRequest: (reqOpt) => {
    if (reqOpt.session.user_id) {
      reqOpt.headers['X-katuma-user-id'] = reqOpt.session.user_id;
    }
    if (config.apiSocketPath) {
      reqOpt.socketPath = config.apiSocketPath;
    } else {
      reqOpt.port = config.apiPort;
    }

    return reqOpt;
  },
  preserveReqSession: true
});
